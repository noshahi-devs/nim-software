import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

interface ClassData {
  id: number;
  className: string;
  classCode: string;
  teacherId: number;
  teacherName: string;
  level: string;
  sectionsCount: number;
  studentsCount: number;
  subjects: string[];
  sections: string[];
  roomNo?: string;
  totalCapacity?: number;
  remarks?: string;
  status: string;
  createdOn: string;
}

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {
  title = 'Class Management';
  classes: ClassData[] = [];
  filteredClasses: ClassData[] = [];
  selectedClass: ClassData | null = null;
  showAddEditDialog = false;
  showViewDialog = false;
  isEditMode = false;
  classForm: ClassData = this.getEmptyForm();
  searchTerm = '';
  rowsPerPage = 10;
  currentPage = 1;
  Math = Math;

  teachers = [
    { id: 1, name: 'Mr. Ahmed Khan' },
    { id: 2, name: 'Mr. Ali Raza' },
    { id: 3, name: 'Ms. Sara Ahmed' },
    { id: 4, name: 'Ms. Fatima Noor' },
    { id: 5, name: 'Mr. Hassan Ali' },
    { id: 6, name: 'Ms. Ayesha Malik' }
  ];

  sections = [
    { id: 'A', name: 'Section A' },
    { id: 'B', name: 'Section B' },
    { id: 'C', name: 'Section C' },
    { id: 'D', name: 'Section D' }
  ];

  subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' },
    { id: 'urdu', name: 'Urdu' },
    { id: 'islamiat', name: 'Islamiat' },
    { id: 'computer', name: 'Computer Science' }
  ];

  classLevels = [
    { label: 'Primary', value: 'Primary' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Secondary', value: 'Secondary' },
    { label: 'Higher Secondary', value: 'Higher Secondary' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    const saved = localStorage.getItem('classManagement');
    if (saved) {
      this.classes = JSON.parse(saved);
    } else {
      this.classes = [
        {
          id: 1, className: '10th', classCode: 'C10', teacherId: 2, teacherName: 'Mr. Ali Raza',
          level: 'Secondary', sectionsCount: 3, studentsCount: 90,
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
          sections: ['Section A', 'Section B', 'Section C'],
          roomNo: 'R-201', totalCapacity: 100, remarks: 'Science group',
          status: 'Active', createdOn: '2024-03-01'
        },
        {
          id: 2, className: '9th', classCode: 'C09', teacherId: 3, teacherName: 'Ms. Sara Ahmed',
          level: 'Secondary', sectionsCount: 2, studentsCount: 70,
          subjects: ['English', 'Biology', 'Urdu'],
          sections: ['Section A', 'Section B'],
          roomNo: 'R-105', totalCapacity: 80, status: 'Active', createdOn: '2023-08-12'
        }
      ];
      this.saveToLocalStorage();
    }
    this.filteredClasses = [...this.classes];
  }

  saveToLocalStorage(): void {
    localStorage.setItem('classManagement', JSON.stringify(this.classes));
  }

  getEmptyForm(): ClassData {
    return {
      id: 0, className: '', classCode: '', teacherId: 0, teacherName: '',
      level: '', sectionsCount: 0, studentsCount: 0, subjects: [], sections: [],
      roomNo: '', totalCapacity: 0, remarks: '', status: 'Active',
      createdOn: new Date().toISOString().split('T')[0]
    };
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.classForm = this.getEmptyForm();
    this.showAddEditDialog = true;
  }

  openEditDialog(classData: ClassData): void {
    this.isEditMode = true;
    this.classForm = { ...classData };
    this.showAddEditDialog = true;
  }

  openViewDialog(classData: ClassData): void {
    this.selectedClass = classData;
    this.showViewDialog = true;
  }

  closeDialog(): void {
    this.showAddEditDialog = false;
    this.showViewDialog = false;
    this.classForm = this.getEmptyForm();
    this.selectedClass = null;
  }

  saveClass(): void {
    if (!this.classForm.className || !this.classForm.classCode || !this.classForm.teacherId || !this.classForm.level) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Fill required fields', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      return;
    }

    const isDuplicate = this.classes.some(c => c.classCode === this.classForm.classCode && c.id !== this.classForm.id);
    if (isDuplicate) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Class code exists', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      return;
    }

    const teacher = this.teachers.find(t => t.id === this.classForm.teacherId);
    if (teacher) this.classForm.teacherName = teacher.name;
    this.classForm.sectionsCount = this.classForm.sections.length;

    if (this.isEditMode) {
      const index = this.classes.findIndex(c => c.id === this.classForm.id);
      if (index !== -1) {
        this.classes[index] = { ...this.classForm };
        Swal.fire({ icon: 'success', title: 'Success', text: 'Class updated', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      }
    } else {
      this.classForm.id = this.classes.length > 0 ? Math.max(...this.classes.map(c => c.id)) + 1 : 1;
      this.classes.push({ ...this.classForm });
      Swal.fire({ icon: 'success', title: 'Success', text: 'Class added', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
    }

    this.saveToLocalStorage();
    this.searchClasses();
    this.closeDialog();
  }

  deleteClass(classData: ClassData): void {
    if (confirm(`Delete ${classData.className}?`)) {
      this.classes = this.classes.filter(c => c.id !== classData.id);
      this.saveToLocalStorage();
      this.searchClasses();
      Swal.fire({ icon: 'success', title: 'Success', text: 'Class deleted', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
    }
  }

  searchClasses(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClasses = [...this.classes];
      this.currentPage = 1;
      return;
    }
    const search = this.searchTerm.toLowerCase();
    this.filteredClasses = this.classes.filter(c =>
      c.className.toLowerCase().includes(search) ||
      c.classCode.toLowerCase().includes(search) ||
      c.teacherName.toLowerCase().includes(search)
    );
    this.currentPage = 1;
  }

  refreshData(): void {
    this.loadClasses();
    this.searchTerm = '';
    Swal.fire({ icon: 'info', title: 'Refreshed', text: 'Data reloaded', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
  }

  get paginatedClasses(): ClassData[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.filteredClasses.slice(start, start + this.rowsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredClasses.length / this.rowsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
}