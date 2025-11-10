import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ExamService, Exam } from '../services/exam.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {
  title = 'Exam Management';

  // Main data lists
  exams: Exam[] = [];
  filteredExams: Exam[] = [];
  paginatedExams: Exam[] = [];

  // Pagination + Search
  searchTerm = '';
  rowsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  loading = false;

  // Dialog state
  showAddEditDialog = false;
  showViewDialog = false;
  isEditMode = false;
  selectedExam: Exam | null = null;

  // Form model
  examForm: Exam = {
    examName: '',
    examType: 'Term',
    classId: 0,
    sectionId: 0,
    startDate: '',
    endDate: '',
    description: '',
    status: 'Active'
  };

  // Dropdown data (Replace with actual API calls)
  examTypes = [
    { label: 'Term Exam', value: 'Term' },
    { label: 'Monthly Test', value: 'Monthly' },
    { label: 'Quiz', value: 'Quiz' }
  ];

  classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  sections = [
    { id: 1, name: 'Section A' },
    { id: 2, name: 'Section B' },
    { id: 3, name: 'Section C' }
  ];

  Math = Math;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.loading = true;
    this.examService
      .getAllExams()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.exams = res || [];
          this.filteredExams = [...this.exams];
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error fetching exams:', err);
          // Use mock data if API fails
          this.loadMockData();
        }
      });
  }

  loadMockData() {
    this.exams = [
      {
        examId: 1,
        examName: 'Mid Term Exam 2024',
        examType: 'Term',
        classId: 1,
        className: 'Class 10',
        sectionId: 1,
        sectionName: 'Section A',
        startDate: '2024-03-15',
        endDate: '2024-03-25',
        description: 'Mid term examination for all subjects',
        status: 'Active'
      },
      {
        examId: 2,
        examName: 'Monthly Test - January',
        examType: 'Monthly',
        classId: 2,
        className: 'Class 9',
        sectionId: 2,
        sectionName: 'Section B',
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        description: 'Monthly assessment test',
        status: 'Inactive'
      }
    ];
    this.filteredExams = [...this.exams];
    this.updatePagination();
  }

  searchExams() {
    const term = this.searchTerm.toLowerCase();
    this.filteredExams = this.exams.filter(e =>
      e.examName.toLowerCase().includes(term) ||
      e.examType.toLowerCase().includes(term) ||
      e.className?.toLowerCase().includes(term) ||
      e.sectionName?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredExams.length / this.rowsPerPage) || 1;
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedExams = this.filteredExams.slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  openAddDialog() {
    this.resetForm();
    this.isEditMode = false;
    this.showAddEditDialog = true;
  }

  openEditDialog(exam: Exam) {
    this.examForm = { ...exam };
    this.isEditMode = true;
    this.showAddEditDialog = true;
  }

  openViewDialog(exam: Exam) {
    this.selectedExam = exam;
    this.showViewDialog = true;
  }

  closeDialog() {
    this.showAddEditDialog = false;
    this.showViewDialog = false;
    this.selectedExam = null;
  }

  saveExam() {
    // Validation
    if (!this.examForm.examName || !this.examForm.startDate || !this.examForm.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields'
      });
      return;
    }

    if (this.isEditMode && this.examForm.examId) {
      this.examService.updateExam(this.examForm.examId, this.examForm).subscribe({
        next: (res) => {
          const index = this.exams.findIndex(e => e.examId === this.examForm.examId);
          if (index !== -1) {
            this.exams[index] = { ...res };
          }
          this.filteredExams = [...this.exams];
          this.updatePagination();
          this.closeDialog();
          Swal.fire({
            icon: 'success',
            title: 'Exam Updated Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Update failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Update Exam',
            text: err.error?.message || 'Something went wrong!'
          });
        }
      });
    } else {
      this.examService.addExam(this.examForm).subscribe({
        next: (res) => {
          this.exams.push(res);
          this.filteredExams = [...this.exams];
          this.updatePagination();
          this.closeDialog();
          Swal.fire({
            icon: 'success',
            title: 'Exam Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Add failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Add Exam',
            text: err.error?.message || 'Something went wrong!'
          });
        }
      });
    }
  }

  deleteExam(exam: Exam) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${exam.examName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && exam.examId) {
        this.examService.deleteExam(exam.examId).subscribe({
          next: () => {
            this.exams = this.exams.filter(e => e.examId !== exam.examId);
            this.filteredExams = [...this.exams];
            this.updatePagination();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Exam has been deleted.',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (err) => {
            console.error('Delete failed:', err);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete',
              text: err.error?.message || 'Something went wrong!'
            });
          }
        });
      }
    });
  }

  refreshData() {
    this.loadExams();
  }

  resetForm() {
    this.examForm = {
      examName: '',
      examType: 'Term',
      classId: 0,
      sectionId: 0,
      startDate: '',
      endDate: '',
      description: '',
      status: 'Active'
    };
  }

  getClassName(classId: number): string {
    return this.classes.find(c => c.id === classId)?.name || '';
  }

  getSectionName(sectionId: number): string {
    return this.sections.find(s => s.id === sectionId)?.name || '';
  }
}
