import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [BreadcrumbComponent, FormsModule, RouterLink, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, AfterViewInit {
  title = 'Class List';
  searchTerm = '';
  filterSection = '';
  classToDelete: any = null;

  grades = ['Nursery', 'Prep', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  sections = ['A', 'B', 'C', 'D'];
  private readonly STORAGE_KEY = 'classList';

  classList: any[] = [];

  ngOnInit(): void {
    const savedData = this.loadClassesFromStorage();
    if (savedData && savedData.length > 0) {
      this.classList = savedData;
    } else {
      this.saveClassesToStorage();
      this.classList = this.loadClassesFromStorage() || [];
    }
  }

  loadClassesFromStorage(): any[] | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  saveClassesToStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify([
        {
          id: 1,
          className: 'Class 9 - A',
          grade: '9',
          section: 'A',
          teacher: 'Sir Ahmed',
          totalStudents: 28,
          image: 'assets/images/user-grid/user-grid-img2.png'
        },
        {
          id: 2,
          className: 'Class 10 - B',
          grade: '10',
          section: 'B',
          teacher: 'Miss Sana',
          totalStudents: 31,
          image: 'assets/images/user-grid/user-grid-img3.png'
        }
      ])
    );
  }

  get filteredClassList() {
    let list = this.classList;
    if (this.filterSection) list = list.filter(c => c.section === this.filterSection);
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      list = list.filter(c =>
        c.className.toLowerCase().includes(search) ||
        c.teacher.toLowerCase().includes(search)
      );
    }
    return list;
  }

  confirmDelete(classItem: any) {
    this.classToDelete = classItem;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  deleteClass() {
    if (this.classToDelete) {
      this.classList = this.classList.filter(c => c.id !== this.classToDelete.id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.classList));
      this.classToDelete = null;
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    modal.hide();
  }

  ngAfterViewInit() {}
}
