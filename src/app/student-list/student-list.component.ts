import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-student-list',
  imports: [BreadcrumbComponent, FormsModule, RouterLink, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'] // ✅ FIXED
})
export class StudentListComponent implements OnInit, AfterViewInit {
  title = 'Student';
  searchTerm = '';
  filterClass = '';
  filterSection = '';
  filterStatus = '';
  studentToDelete: any = null;

  classes = ['Nursery', 'Prep', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  sections = ['A', 'B', 'C', 'D'];
  private readonly STORAGE_KEY = 'studentList';

  studentList: any[] = [];

  ngOnInit(): void {
    const savedData = this.loadStudentsFromStorage();

    if (savedData && savedData.length > 0) {
      this.studentList = savedData;
    } else {
      this.saveStudentsToStorage();
      this.studentList = this.loadStudentsFromStorage() || [];
    }
  }

  loadStudentsFromStorage(): any[] | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  saveStudentsToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([
      {
        id: 1,
        name: 'Ayesha Khan',
        rollNo: '23',
        class: '9',
        section: 'A',
        gender: 'Female',
        dob: '2009-05-15',
        phone: '0312-1234567',
        guardianName: 'Khalid Khan',
        guardianPhone: '0300-1112233',
        address: 'Lahore, Pakistan',
        admissionDate: '2024-04-10',
        previousSchool: 'Allied School',
        profile: 'assets/images/user-grid/user-grid-img2.png',
        status: 'active'
      },
      {
        id: 2,
        name: 'Bilal Ahmad',
        rollNo: '45',
        class: '10',
        section: 'B',
        gender: 'Male',
        dob: '2008-03-12',
        phone: '0321-9876543',
        guardianName: 'Tariq Ahmad',
        guardianPhone: '0311-9998877',
        address: 'Faisalabad, Pakistan',
        admissionDate: '2023-05-01',
        previousSchool: 'The Educators',
        profile: 'assets/images/user-grid/user-grid-img3.png',
        status: 'inactive'
      }
    ]));
  }

  get filteredStudentList() {
    let list = this.studentList;
    if (this.filterClass) list = list.filter(s => s.class === this.filterClass);
    if (this.filterSection) list = list.filter(s => s.section === this.filterSection);
    if (this.filterStatus) list = list.filter(s => s.status === this.filterStatus);

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.rollNo.toLowerCase().includes(search) ||
        s.class.toLowerCase().includes(search)
      );
    }

    return list;
  }

  confirmDelete(student: any) {
    this.studentToDelete = student;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  deleteStudent() {
    if (this.studentToDelete) {
      this.studentList = this.studentList.filter(s => s.id !== this.studentToDelete.id);
      this.saveStudentsToStorage();
      this.studentToDelete = null;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    modal.hide();
  }

  ngAfterViewInit() {}
}

