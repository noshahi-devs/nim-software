import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

declare var bootstrap: any;

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, RouterLink],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubjectListComponent implements OnInit, AfterViewInit {
  title = 'Subject List';
  searchTerm = '';
  filterClass = '';
  subjectToDelete: any = null;

  classes: string[] = [];
  subjectList: any[] = [];

  ngOnInit(): void {
    this.loadSubjects();
    this.loadClasses();
  }

  ngAfterViewInit(): void {}

  loadSubjects(): void {
    const savedSubjects = localStorage.getItem('subjectList');
    this.subjectList = savedSubjects ? JSON.parse(savedSubjects) : [];
  }

  loadClasses(): void {
    const savedClasses = localStorage.getItem('classList');
    if (savedClasses) {
      const classList = JSON.parse(savedClasses);
      this.classes = classList.map((c: any) => c.className);
    }
  }

  get filteredSubjectList() {
    let list = this.subjectList;
    if (this.filterClass) {
      list = list.filter(s => s.className === this.filterClass);
    }
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      list = list.filter(s =>
        s.subjectName.toLowerCase().includes(search) ||
        s.className.toLowerCase().includes(search)
      );
    }
    return list;
  }

  confirmDelete(subject: any): void {
    this.subjectToDelete = subject;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  deleteSubject(): void {
    if (this.subjectToDelete) {
      this.subjectList = this.subjectList.filter(s => s.id !== this.subjectToDelete.id);
      localStorage.setItem('subjectList', JSON.stringify(this.subjectList));
      this.subjectToDelete = null;
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Subject has been deleted.',
        timer: 1500,
        showConfirmButton: false
      });
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    modal.hide();
  }
}
