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
//   title = 'Add Staff';
//   private readonly STORAGE_KEY = 'staffList';

//   // New staff object
//   newStaff = {
//     id: 0,
//     name: '',
//     phone: '',
//     profile: 'assets/images/user-grid/user-grid-img2.png',
//     joiningDate: '',
//     role: '',
//     cnic: '',
//     experience: '',
//     gender: 'Male',
//     dob: '',
//     email: '',
//     qualification: 'Masters',
//     status: 'active',
//     address: '',
//     section: '',
//     bg: 'assets/images/user-grid/user-grid-bg1.png'
//   };

//   constructor(private router: Router) {}

//   // Load from local storage
//   loadStaffFromStorage(): any[] {
//     const data = localStorage.getItem(this.STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   }

//   // Save to local storage
//   saveStaffToStorage(staffList: any[]): void {
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(staffList));
//   }

//   // Handle image upload
//   onImageSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.newStaff.profile = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   // Add new staff member
//   addStaff(): void {
//     // Validation for required fields
//     if (!this.newStaff.name || !this.newStaff.phone || !this.newStaff.joiningDate || !this.newStaff.role) {
//       alert('Please fill in all required fields (marked with *)');
//       return;
//     }

//     const staffList = this.loadStaffFromStorage();

//     // Generate unique ID
//     const newId = staffList.length > 0 ? Math.max(...staffList.map((s: any) => s.id)) + 1 : 1;

//     const staffToAdd = {
//       id: newId,
//       ...this.newStaff
//     };

//     staffList.push(staffToAdd);
//     this.saveStaffToStorage(staffList);

//     alert('Staff added successfully!');
    

//     setTimeout(() => this.router.navigate(['/staff-list']), 800);
//   }

//   // Save staff - wrapper for addStaff
//   saveStaff(): void {
//     this.addStaff();
//   }

//   cancel(): void {
//     this.router.navigate(['/staff-list']);
//   }

//   ngAfterViewInit(): void {
//     // optional JS logic for form UI initialization (like select icons or preview)
//   }
  
// }

import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

declare var bootstrap: any;

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
    customExperience: '', // ✅ add this line
    gender: '',
    dob: '',
    email: '',
    qualification: '',
    status: '',
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

  // 🔹 Show popup by ID
  showPopup(id: string) {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // ✅ Called when form is submitted
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      // Mark all controls as touched to trigger red borders
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      // Show validation popup
      this.showPopup('validationModal');
      return;
    }

    // If form is valid, proceed
    const staffList = this.loadStaffFromStorage();
    const newId = staffList.length > 0 ? Math.max(...staffList.map((s: any) => s.id)) + 1 : 1;

    const staffToAdd = { id: newId, ...this.newStaff };
    staffList.push(staffToAdd);
    this.saveStaffToStorage(staffList);

    // ✅ Show success popup before redirect
    this.showPopup('successModal');
    setTimeout(() => this.router.navigate(['/staff-list']), 1200);
  }

  cancel(): void {
    this.router.navigate(['/staff-list']);
  }

  ngAfterViewInit(): void {}
}

