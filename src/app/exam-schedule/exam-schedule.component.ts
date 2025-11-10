import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ExamService, ExamSchedule, Exam } from '../services/exam.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exam-schedule.component.html',
  styleUrl: './exam-schedule.component.css'
})
export class ExamScheduleComponent implements OnInit {
  title = 'Exam Schedule';

  schedules: ExamSchedule[] = [];
  filteredSchedules: ExamSchedule[] = [];
  paginatedSchedules: ExamSchedule[] = [];

  searchTerm = '';
  rowsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  loading = false;

  showAddEditDialog = false;
  showViewDialog = false;
  isEditMode = false;
  selectedSchedule: ExamSchedule | null = null;

  selectedExamId: number = 0;
  selectedClassId: number = 0;

  scheduleForm: ExamSchedule = {
    examId: 0,
    subjectId: 0,
    examDate: '',
    startTime: '',
    endTime: '',
    room: '',
    invigilatorId: 0
  };

  exams: Exam[] = [];
  subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'Urdu' },
    { id: 5, name: 'Islamiat' },
    { id: 6, name: 'Physics' },
    { id: 7, name: 'Chemistry' },
    { id: 8, name: 'Biology' }
  ];

  teachers = [
    { id: 1, name: 'Ali Khan' },
    { id: 2, name: 'Sara Ahmed' },
    { id: 3, name: 'Bilal Hussain' },
    { id: 4, name: 'Fatima Noor' },
    { id: 5, name: 'Ahmed Raza' }
  ];

  classes = [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 9' },
    { id: 3, name: 'Class 8' }
  ];

  Math = Math;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.loadExams();
    this.loadSchedules();
  }

  loadExams() {
    this.examService.getAllExams().subscribe({
      next: (res) => {
        this.exams = res || [];
      },
      error: (err) => {
        console.error('Error fetching exams:', err);
        this.exams = [
          {
            examId: 1,
            examName: 'Mid Term Exam 2024',
            examType: 'Term',
            classId: 1,
            className: 'Class 10',
            sectionId: 1,
            startDate: '2024-03-15',
            endDate: '2024-03-25',
            status: 'Active'
          }
        ];
      }
    });
  }

  loadSchedules() {
    if (this.selectedExamId === 0) {
      this.loadMockData();
      return;
    }

    this.loading = true;
    this.examService
      .getSchedulesByExam(this.selectedExamId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.schedules = res || [];
          this.filteredSchedules = [...this.schedules];
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error fetching schedules:', err);
          this.loadMockData();
        }
      });
  }

  loadMockData() {
    this.schedules = [
      {
        scheduleId: 1,
        examId: 1,
        examName: 'Mid Term Exam 2024',
        subjectId: 1,
        subjectName: 'Mathematics',
        examDate: '2024-03-15',
        startTime: '09:00',
        endTime: '12:00',
        room: 'Room 101',
        invigilatorId: 1,
        invigilatorName: 'Ali Khan'
      },
      {
        scheduleId: 2,
        examId: 1,
        examName: 'Mid Term Exam 2024',
        subjectId: 2,
        subjectName: 'English',
        examDate: '2024-03-16',
        startTime: '09:00',
        endTime: '11:00',
        room: 'Room 102',
        invigilatorId: 2,
        invigilatorName: 'Sara Ahmed'
      },
      {
        scheduleId: 3,
        examId: 1,
        examName: 'Mid Term Exam 2024',
        subjectId: 3,
        subjectName: 'Science',
        examDate: '2024-03-17',
        startTime: '10:00',
        endTime: '12:30',
        room: 'Lab 1',
        invigilatorId: 3,
        invigilatorName: 'Bilal Hussain'
      }
    ];
    this.filteredSchedules = [...this.schedules];
    this.updatePagination();
  }

  onExamChange() {
    this.loadSchedules();
  }

  searchSchedules() {
    const term = this.searchTerm.toLowerCase();
    this.filteredSchedules = this.schedules.filter(s =>
      s.subjectName?.toLowerCase().includes(term) ||
      s.examName?.toLowerCase().includes(term) ||
      s.room?.toLowerCase().includes(term) ||
      s.invigilatorName?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSchedules.length / this.rowsPerPage) || 1;
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedSchedules = this.filteredSchedules.slice(start, end);
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

  openEditDialog(schedule: ExamSchedule) {
    this.scheduleForm = { ...schedule };
    this.isEditMode = true;
    this.showAddEditDialog = true;
  }

  openViewDialog(schedule: ExamSchedule) {
    this.selectedSchedule = schedule;
    this.showViewDialog = true;
  }

  closeDialog() {
    this.showAddEditDialog = false;
    this.showViewDialog = false;
    this.selectedSchedule = null;
  }

  saveSchedule() {
    if (!this.scheduleForm.examId || !this.scheduleForm.subjectId || 
        !this.scheduleForm.examDate || !this.scheduleForm.startTime || !this.scheduleForm.endTime) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields'
      });
      return;
    }

    if (this.isEditMode && this.scheduleForm.scheduleId) {
      this.examService.updateSchedule(this.scheduleForm.scheduleId, this.scheduleForm).subscribe({
        next: (res) => {
          const index = this.schedules.findIndex(s => s.scheduleId === this.scheduleForm.scheduleId);
          if (index !== -1) {
            this.schedules[index] = { ...res };
          }
          this.filteredSchedules = [...this.schedules];
          this.updatePagination();
          this.closeDialog();
          Swal.fire({
            icon: 'success',
            title: 'Schedule Updated Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Update failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Update Schedule',
            text: err.error?.message || 'Something went wrong!'
          });
        }
      });
    } else {
      this.examService.addSchedule(this.scheduleForm).subscribe({
        next: (res) => {
          this.schedules.push(res);
          this.filteredSchedules = [...this.schedules];
          this.updatePagination();
          this.closeDialog();
          Swal.fire({
            icon: 'success',
            title: 'Schedule Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Add failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Add Schedule',
            text: err.error?.message || 'Something went wrong!'
          });
        }
      });
    }
  }

  deleteSchedule(schedule: ExamSchedule) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this schedule?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && schedule.scheduleId) {
        this.examService.deleteSchedule(schedule.scheduleId).subscribe({
          next: () => {
            this.schedules = this.schedules.filter(s => s.scheduleId !== schedule.scheduleId);
            this.filteredSchedules = [...this.schedules];
            this.updatePagination();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Schedule has been deleted.',
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
    this.loadSchedules();
  }

  resetForm() {
    this.scheduleForm = {
      examId: this.selectedExamId || 0,
      subjectId: 0,
      examDate: '',
      startTime: '',
      endTime: '',
      room: '',
      invigilatorId: 0
    };
  }

  getSubjectName(subjectId: number): string {
    return this.subjects.find(s => s.id === subjectId)?.name || '';
  }

  getTeacherName(teacherId: number): string {
    return this.teachers.find(t => t.id === teacherId)?.name || '';
  }

  getExamName(examId: number): string {
    return this.exams.find(e => e.examId === examId)?.examName || '';
  }
}