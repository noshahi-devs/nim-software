// import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// declare var $: any;
// import {
//   NgApexchartsModule,
//   ChartComponent
// } from 'ng-apexcharts';
// import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
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
declare var $: any;

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
      designation: 'System Technician'
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

  // Generate Appointment Letter
  generateAppointmentLetter(staff: any): void {
    const letterContent = `
      <html>
        <head>
          <title>Appointment Letter - ${staff.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #2c3e50; margin: 0; }
            .header p { margin: 5px 0; color: #7f8c8d; }
            .content { margin: 20px 0; }
            .field { margin: 10px 0; }
            .field strong { display: inline-block; width: 150px; }
            .footer { margin-top: 50px; }
            .signature { margin-top: 80px; }
            .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Noshahi School System</h1>
            <p>Appointment Letter</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="content">
            <p>Dear ${staff.name},</p>
            
            <p>We are pleased to inform you that you have been appointed as <strong>${staff.role || staff.designation || 'Staff Member'}</strong> 
            at Noshahi School System, effective from <strong>${new Date(staff.joiningDate).toLocaleDateString()}</strong>.</p>
            
            <h3>Personal Details:</h3>
            <div class="field"><strong>Name:</strong> ${staff.name}</div>
            <div class="field"><strong>CNIC:</strong> ${staff.cnic}</div>
            <div class="field"><strong>Gender:</strong> ${staff.gender}</div>
            <div class="field"><strong>Date of Birth:</strong> ${new Date(staff.dob).toLocaleDateString()}</div>
            <div class="field"><strong>Phone:</strong> ${staff.phone}</div>
            <div class="field"><strong>Email:</strong> ${staff.email || 'N/A'}</div>
            <div class="field"><strong>Address:</strong> ${staff.address}</div>
            
            <h3>Position Details:</h3>
            <div class="field"><strong>Role:</strong> ${staff.role || staff.designation || 'N/A'}</div>
            <div class="field"><strong>Section:</strong> ${staff.section || 'N/A'}</div>
            <div class="field"><strong>Qualification:</strong> ${staff.qualification || 'N/A'}</div>
            <div class="field"><strong>Joining Date:</strong> ${new Date(staff.joiningDate).toLocaleDateString()}</div>
            <div class="field"><strong>Status:</strong> ${staff.status}</div>
            
            <p style="margin-top: 30px;">We welcome you to our team and look forward to your valuable contribution to our institution.</p>
            
            <div class="footer">
              <p>Best Regards,</p>
              <div class="signature">
                <div class="signature-line"></div>
                <p><strong>Principal</strong><br>Noshahi School System</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Open letter in new window and print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(letterContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Auto print after a short delay
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      alert('Please allow popups to generate appointment letter');
    }
  }
}
