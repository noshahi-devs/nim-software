// import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// declare var $: any;
// import {
//   NgApexchartsModule,
//   ChartComponent
// } from 'ng-apexcharts';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// @Component({
//   selector: 'app-staff-list',
//   standalone: true,
//   imports: [NgApexchartsModule, CommonModule,
//     FormsModule, RouterLink],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   templateUrl: './staff-list.component.html',
//   styleUrl: './staff-list.component.css'
// })
// export class StaffListComponent implements AfterViewInit {
//   title = 'Users List';
//   constructor() { }

//   ngAfterViewInit() {
//     $('.delete-btn').on('click', function () {
//       $(this).closest('.user-grid-card').addClass('d-none')
//     });

//   }

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
declare var $: any;

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, AfterViewInit {
  title = 'Staff List';
  searchTerm: string = '';

  private readonly STORAGE_KEY = 'staffList';

  staffList = this.loadStaffFromStorage() || [
    {
      id: 1,
      name: 'Ayesha Khan',
      cnic: '35202-1234567-8',
      gender: 'Female',
      dob: '1995-08-15',
      phone: '0312-1234567',
      email: 'ayesha.khan@noshahi.edu.pk',
      qualification: 'MBA',
      section: 'Administration',
      address: 'Lahore, Pakistan',
      joiningDate: '2021-02-12',
      profile: 'assets/images/user-grid/user-grid-img2.png',
      status: 'Active',
      bg: 'assets/images/user-grid/user-grid-bg2.png',
      designation: 'Office Assistant'
    },
    {
      id: 2,
      name: 'Bilal Ahmad',
      cnic: '35201-7654321-9',
      gender: 'Male',
      dob: '1990-03-12',
      phone: '0321-9876543',
      email: 'bilal.ahmad@noshahi.edu.pk',
      qualification: 'B.Com',
      section: 'Accounts',
      address: 'Faisalabad, Pakistan',
      joiningDate: '2019-06-01',
      profile: 'assets/images/user-grid/user-grid-img3.png',
      status: 'Active',
      bg: 'assets/images/user-grid/user-grid-bg3.png',
      designation: 'Finance Officer'
    },
    {
      id: 3,
      name: 'Hamza Tariq',
      cnic: '35203-2222333-4',
      gender: 'Male',
      dob: '1997-01-10',
      phone: '0301-2223344',
      email: 'hamza.tariq@noshahi.edu.pk',
      qualification: 'BS IT',
      section: 'IT Support',
      address: 'Multan, Pakistan',
      joiningDate: '2020-09-10',
      profile: 'assets/images/user-grid/user-grid-img4.png',
      status: 'Active',
      bg: 'assets/images/user-grid/user-grid-bg4.png',
    }
  ];

  // Getter for filtered staff list based on search
  get filteredStaffList() {
    if (!this.searchTerm) {
      return this.staffList;
    }
    
    const search = this.searchTerm.toLowerCase();
    return this.staffList.filter(staff => 
      staff.name.toLowerCase().includes(search) ||
      staff.email.toLowerCase().includes(search) ||
      staff.designation.toLowerCase().includes(search) ||
      staff.section.toLowerCase().includes(search) ||
      staff.phone.includes(search)
    );
  }

  // Load staff data from localStorage
  loadStaffFromStorage(): any[] | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Save staff data to localStorage
  saveStaffToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.staffList));
  }

  // Initialize data on component load
  ngOnInit(): void {
    // If no data in localStorage, save initial data
    if (!this.loadStaffFromStorage()) {
      this.saveStaffToStorage();
    }
  }

  ngAfterViewInit() {
    $('.delete-btn').on('click', function () {
      $(this).closest('.user-grid-card').addClass('d-none');
    });
  }
}
