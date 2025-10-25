// import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
// declare var $: any;

// @Component({
//   selector: 'app-staff-add',
//   standalone: true,
//   imports: [CommonModule, FormsModule, BreadcrumbComponent],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   templateUrl: './staff-add.component.html',
//   styleUrl: './staff-add.component.css'
// })
// export class StaffAddComponent implements AfterViewInit {
// onImageSelected($event: Event) {
// throw new Error('Method not implemented.');
// }
//   title = 'Add Staff';
//   private readonly STORAGE_KEY = 'staffList';

//   // New staff object
//   newStaff = {
//     name: '',
//     cnic: '',
//     experience: '',
//     gender: 'Male',
//     dob: '',
//     phone: '',
//     email: '',
//     qualification: 'Masters',
//     section: '',
//     role: '',
//     address: '',
//     joiningDate: '',
//     profile: 'assets/images/user-grid/user-grid-img2.png',
//     status: 'active',
//     bg: 'assets/images/user-grid/user-grid-bg1.png',

//   };

//   constructor(private router: Router) { }

//   // Load staff data from localStorage
//   loadStaffFromStorage(): any[] {
//     const data = localStorage.getItem(this.STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   }

//   // Save staff data to localStorage
//   saveStaffToStorage(staffList: any[]): void {
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(staffList));
//   }

//   // Add new staff
//   addStaff(): void {
//     // Validation for required fields (marked with ⭐)
//     if (!this.newStaff.name || !this.newStaff.cnic || !this.newStaff.gender || 
//         !this.newStaff.dob || !this.newStaff.phone || !this.newStaff.address || 
//         !this.newStaff.joiningDate || !this.newStaff.status) {
//       alert('Please fill in all required fields (marked with ⭐)');
//       return;
//     }

//     const staffList = this.loadStaffFromStorage();

//     const newId = staffList.length > 0 ? Math.max(...staffList.map((s: any) => s.id)) + 1 : 1;

//     const staffToAdd = {
//       id: newId,
//       ...this.newStaff
//     };

//     staffList.push(staffToAdd);

//     this.saveStaffToStorage(staffList);

//     const generateLetter = confirm('Staff added successfully! Do you want to generate appointment letter?');

//     if (generateLetter) {
//       this.generateAppointmentLetter(staffToAdd);
//     }

//     setTimeout(() => {
//       this.router.navigate(['/staff-list']);
//     }, 1000);
//   }

//   generateAppointmentLetter(staff: any): void {
//     const letterContent = `
//       <html>
//         <head>
//           <title>Appointment Letter - ${staff.name}</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
//             .header { text-align: center; margin-bottom: 30px; }
//             .header h1 { color: #2c3e50; margin: 0; }
//             .header p { margin: 5px 0; color: #7f8c8d; }
//             .content { margin: 20px 0; }
//             .field { margin: 10px 0; }
//             .field strong { display: inline-block; width: 150px; }
//             .footer { margin-top: 50px; }
//             .signature { margin-top: 80px; }
//             .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 5px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Noshahi School System</h1>
//             <p>Appointment Letter</p>
//             <p>Date: ${new Date().toLocaleDateString()}</p>
//           </div>
          
//           <div class="content">
//             <p>Dear ${staff.name},</p>
            
//             <p>We are pleased to inform you that you have been appointed as <strong>${staff.role || 'Staff Member'}</strong> 
//             at Noshahi School System, effective from <strong>${new Date(staff.joiningDate).toLocaleDateString()}</strong>.</p>
            
//             <h3>Personal Details:</h3>
//             <div class="field"><strong>Name:</strong> ${staff.name}</div>
//             <div class="field"><strong>CNIC:</strong> ${staff.cnic}</div>
//             <div class="field"><strong>Experience:</strong> ${staff.experience}</div>
//             <div class="field"><strong>Gender:</strong> ${staff.gender}</div>
//             <div class="field"><strong>Date of Birth:</strong> ${new Date(staff.dob).toLocaleDateString()}</div>
//             <div class="field"><strong>Phone:</strong> ${staff.phone}</div>
//             <div class="field"><strong>Email:</strong> ${staff.email || 'N/A'}</div>
//             <div class="field"><strong>Address:</strong> ${staff.address}</div>
            
//             <h3>Position Details:</h3>
//             <div class="field"><strong>Role:</strong> ${staff.role || 'N/A'}</div>
//             <div class="field"><strong>Section:</strong> ${staff.section || 'N/A'}</div>
//             <div class="field"><strong>Qualification:</strong> ${staff.qualification || 'N/A'}</div>
//             <div class="field"><strong>Joining Date:</strong> ${new Date(staff.joiningDate).toLocaleDateString()}</div>
//             <div class="field"><strong>Status:</strong> ${staff.status}</div>
            
//             <p style="margin-top: 30px;">We welcome you to our team and look forward to your valuable contribution to our institution.</p>
            
//             <div class="footer">
//               <p>Best Regards,</p>
//               <div class="signature">
//                 <div class="signature-line"></div>
//                 <p><strong>Principal</strong><br>Noshahi School System</p>
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank');
//     if (printWindow) {
//       printWindow.document.write(letterContent);
//       printWindow.document.close();
//       printWindow.focus();
      
//       setTimeout(() => {
//         printWindow.print();
//       }, 500);
//     }
//   }

//   cancel(): void {
//     this.router.navigate(['/staff-list']);
//   }

//   ngAfterViewInit(): void {
//   }
  
// }

import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

declare var $: any;

@Component({
  selector: 'app-staff-add',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './staff-add.component.html',
  styleUrl: './staff-add.component.css'
})
export class StaffAddComponent implements AfterViewInit {
  title = 'Add Staff';
  private readonly STORAGE_KEY = 'staffList';

  // New staff object
  newStaff = {
    id: 0,
    name: '',
    phone: '',
    profile: 'assets/images/user-grid/user-grid-img2.png',
    joiningDate: '',
    role: '',
    cnic: '',
    experience: '',
    gender: 'Male',
    dob: '',
    email: '',
    qualification: 'Masters',
    status: 'active',
    address: '',
    section: '',
    bg: 'assets/images/user-grid/user-grid-bg1.png'
  };

  constructor(private router: Router) {}

  // Load from local storage
  loadStaffFromStorage(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Save to local storage
  saveStaffToStorage(staffList: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(staffList));
  }

  // Handle image upload
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newStaff.profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Add new staff member
  addStaff(): void {
    // Validation for required fields
    if (!this.newStaff.name || !this.newStaff.phone || !this.newStaff.joiningDate || !this.newStaff.role) {
      alert('Please fill in all required fields (marked with *)');
      return;
    }

    const staffList = this.loadStaffFromStorage();

    // Generate unique ID
    const newId = staffList.length > 0 ? Math.max(...staffList.map((s: any) => s.id)) + 1 : 1;

    const staffToAdd = {
      id: newId,
      ...this.newStaff
    };

    staffList.push(staffToAdd);
    this.saveStaffToStorage(staffList);

    const generateLetter = confirm('Staff added successfully! Do you want to generate an appointment letter?');
    if (generateLetter) this.generateAppointmentLetter(staffToAdd);

    setTimeout(() => this.router.navigate(['/staff-list']), 800);
  }

  // Appointment letter generator
  generateAppointmentLetter(staff: any): void {
    const letterContent = `
      <html>
        <head>
          <title>Appointment Letter - ${staff.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #2c3e50; margin: 0; }
            .content { margin: 20px 0; }
            .field { margin: 8px 0; }
            .field strong { display: inline-block; width: 160px; }
            .footer { margin-top: 50px; }
            .signature { margin-top: 80px; }
            .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Noshahi School System</h1>
            <p><strong>Appointment Letter</strong></p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="content">
            <p>Dear ${staff.name},</p>
            <p>We are pleased to inform you that you have been appointed as <strong>${staff.role}</strong> 
            at Noshahi School System, effective from <strong>${new Date(staff.joiningDate).toLocaleDateString()}</strong>.</p>

            <h3>Personal Details</h3>
            <div class="field"><strong>Name:</strong> ${staff.name}</div>
            <div class="field"><strong>Phone:</strong> ${staff.phone}</div>
            <div class="field"><strong>CNIC:</strong> ${staff.cnic}</div>
            <div class="field"><strong>Email:</strong> ${staff.email || 'N/A'}</div>
            <div class="field"><strong>Gender:</strong> ${staff.gender}</div>
            <div class="field"><strong>DOB:</strong> ${staff.dob ? new Date(staff.dob).toLocaleDateString() : 'N/A'}</div>

            <h3>Official Details</h3>
            <div class="field"><strong>Role:</strong> ${staff.role}</div>
            <div class="field"><strong>Joining Date:</strong> ${new Date(staff.joiningDate).toLocaleDateString()}</div>
            <div class="field"><strong>Status:</strong> ${staff.status}</div>
            <div class="field"><strong>Qualification:</strong> ${staff.qualification}</div>
            <div class="field"><strong>Experience:</strong> ${staff.experience}</div>
            <div class="field"><strong>Address:</strong> ${staff.address}</div>

            <p style="margin-top: 30px;">We welcome you to our team and look forward to your valuable contribution.</p>

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

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(letterContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  }

  cancel(): void {
    this.router.navigate(['/staff-list']);
  }

  ngAfterViewInit(): void {
    // optional JS logic for form UI initialization (like select icons or preview)
  }
}
