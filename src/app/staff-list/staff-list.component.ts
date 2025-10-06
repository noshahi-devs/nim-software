import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var $: any;
import {
  NgApexchartsModule,
  ChartComponent
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule,
    FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent implements AfterViewInit {
  searchText: string = '';
  showDeleteConfirm = false;
  selectedStaff: any = null;

  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  staffList = [
    { name: 'Ayesha Khan', role: 'Teacher', image: 'assets/images/chat/2.png' },
    { name: 'Ali Raza', role: 'Accountant', image: 'assets/images/chat/1.png' },
    { name: 'Sana Malik', role: 'Principal', image: 'assets/images/chat/3.png' },
  ];

  filteredStaff = [...this.staffList];

  filterStaff() {
    const query = this.searchText.toLowerCase();
    this.filteredStaff = this.staffList.filter(staff =>
      staff.name.toLowerCase().includes(query) ||
      staff.role.toLowerCase().includes(query)
    );
  }

  syncStaff() {
    console.log('🔄 Syncing staff data...');
  }

  viewStaff(staff: any) {
    alert(`👁 Viewing ${staff.name}`);
    this.router.navigate(['/staff-view-profile']);

  }

  editStaff(staff: any) {
    alert(`✏️ Editing ${staff.name}`);
    this.router.navigate(['/staff-edit-profile']);

  }

  deleteStaff(staff: any) {
    this.selectedStaff = staff;
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    this.staffList = this.staffList.filter(s => s !== this.selectedStaff);
    this.filteredStaff = [...this.staffList];
    this.showDeleteConfirm = false;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  addNewStaff() {
    // ✅ Navigate to Add Staff Module
    this.router.navigate(['/staff-add']);
  }


}

