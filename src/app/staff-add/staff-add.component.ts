// import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
// import { StaffService } from '../services/staff.service';
// import Swal from 'sweetalert2';

// declare var bootstrap: any;

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
//   formSubmitted = false;

//   // New staff object
//   newStaff = {
//     id: 0,
//     staffName: '',
//     contactNumber1: '',
//     profile: 'assets/images/user-grid/user-grid-img2.png',
//     joiningDate: '',
//     designation: '',
//     cnic: '',
//     experience: '',
//     customExperience: '', // ✅ add this line
//     programDuration: '', // 👈 for associate degree 2-year / 4-year
//     gender: '',
//     subject: '', // ✅ add this line for qualification subject
//     customSubject: '', // ✅ add this line for custom subject
//     dob: '',
//     email: '',
//     qualifications: '',
//     status: '',
//     permanentAddress: '',
//     section: '',
//     bg: 'assets/images/user-grid/user-grid-bg1.png'
//   };

//   // constructor(private router: Router) {
//   //   this.setDefaultValues();
//   // }

//   // Set default values
//   setDefaultValues(): void {
//     // Set defaults for fields
//     this.newStaff.experience = '1+';
//     this.newStaff.gender = 'Male';
//     this.newStaff.status = 'active';
//     this.newStaff.designation = 'Teacher';
//     this.newStaff.qualifications = 'bachelors';
//     this.newStaff.subject = 'bsEnglish';
//   }

//   // Email validation
//   validateEmail(): { isValid: boolean; message: string; color: string } {
//     const email = this.newStaff.email;
//     const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

//     if (email === '') {
//       return { isValid: false, message: '', color: '' };
//     }

//     if (email.match(pattern)) {
//       return { isValid: true, message: 'Valid email address', color: '#198754' };
//     } else {
//       return { isValid: false, message: 'Please enter valid email address', color: '#dc3545' };
//     }
//   }

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

//   // 🔹 Show popup by ID
//   showPopup(id: string) {
//     const modalEl = document.getElementById(id);
//     if (modalEl) {
//       const modal = new bootstrap.Modal(modalEl);
//       modal.show();
//     }
//   }

//   // ✅ Called when form is submitted
//    constructor(private staffService: StaffService, private router: Router) {
//     this.setDefaultValues();
//   }

//   onSubmit(form: NgForm) {
//     // Check if form is invalid
//     if (form.invalid) {
//       // Mark all fields as touched to show validation errors
//       Object.keys(form.controls).forEach(key => {
//         form.controls[key].markAsTouched();
//       });
      
//       // Show validation error popup
//       Swal.fire({
//         icon: 'error',
//         title: 'Form Incomplete',
//         text: 'Please fill in all required fields marked with *',
//         confirmButtonText: 'OK'
//       });
//       return;
//     }

//     // Show confirmation popup before saving
//     Swal.fire({
//       title: 'Confirm Save',
//       text: 'Do you want to save this staff member?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Save',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Map designation string to enum number for API
//         const designationMap: { [key: string]: number } = {
//           'Teacher': 0,
//           'Principal': 1,
//           'Admin': 2,
//           'Accountant': 3,
//           'Instructor': 0,  // Map Instructor to Teacher
//           'Professor': 0,
//           'Counselor': 1,
//           'Headmistress': 1
//         };

//         // Map form data to Staff interface
//         const staffData = {
//           staff: this.newStaff.staffName,  // API expects 'staff' field
//           gender: this.newStaff.gender,
//           dob: this.newStaff.dob,
//           contactNumber1: this.newStaff.contactNumber1,
//           email: this.newStaff.email,
//           qualifications: this.newStaff.qualifications,
//           joiningDate: this.newStaff.joiningDate,
//           designation: designationMap[this.newStaff.designation] ?? 0,  // Convert to number
//           permanentAddress: this.newStaff.permanentAddress,
//           status: this.newStaff.status
//         };

//         // Log the data being sent
//         console.log('Sending staff data:', staffData);

//         this.staffService.addStaff(staffData).subscribe({
//           next: (res) => {
//             Swal.fire({
//               icon: 'success',
//               title: 'Staff Added Successfully!',
//               showConfirmButton: false,
//               timer: 1500
//             });
//             this.router.navigate(['/staff-list']); // ✅ redirect to staff list
//           },
//           error: (err) => {
//             console.error('Full error:', err);
//             console.error('Error status:', err.status);
//             console.error('Error message:', err.error);
            
//             let errorMessage = 'Something went wrong!';
            
//             // Extract error message from response
//             if (err.error) {
//               if (typeof err.error === 'string') {
//                 errorMessage = err.error;
//               } else if (err.error.message) {
//                 errorMessage = err.error.message;
//               } else if (err.error.errors) {
//                 // Handle validation errors
//                 const errors = Object.values(err.error.errors).flat();
//                 errorMessage = errors.join(', ');
//               } else {
//                 errorMessage = JSON.stringify(err.error);
//               }
//             } else if (err.message) {
//               errorMessage = err.message;
//             }
            
//             Swal.fire({
//               icon: 'error',
//               title: 'Failed to Add Staff',
//               text: errorMessage,
//               footer: `Status: ${err.status} - ${err.statusText}`
//             });
//           }
//         });
//       }
//     });
//   }

//   cancel(): void {
//     this.router.navigate(['/staff-list']);
//   }

//   ngAfterViewInit(): void {}
// }



import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { StaffService } from '../services/staff.service';
import Swal from 'sweetalert2';

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
  formSubmitted = false;

  newStaff = {
    id: 0,
    staffName: '',
    contactNumber1: '',
    profile: 'assets/images/user-grid/user-grid-img2.png',
    joiningDate: '',
    designation: '',
    cnic: '',
    experience: '',
    customExperience: '',
    programDuration: '',
    gender: '',
    subject: '',
    customSubject: '',
    dob: '',
    email: '',
    qualifications: '',
    status: '',
    permanentAddress: '',
    section: '',
    bg: 'assets/images/user-grid/user-grid-bg1.png'
  };

  constructor(
    
    private staffService: StaffService, 
    private router: Router
  
  ) 
    
    
    {
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    this.newStaff.experience = '1+';
    this.newStaff.gender = 'Male';
    this.newStaff.status = 'Active';  // Match API format
    this.newStaff.designation = 'Teacher';  // Match HTML dropdown
    this.newStaff.qualifications = 'bachelors';
    this.newStaff.subject = 'bsEnglish';
  }

  validateEmail(): { isValid: boolean; message: string; color: string } {
    const email = this.newStaff.email;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === '') {
      return { isValid: false, message: '', color: '' };
    }
    if (email.match(pattern)) {
      return { isValid: true, message: 'Valid email address', color: '#198754' };
    } else {
      return { isValid: false, message: 'Please enter valid email address', color: '#dc3545' };
    }
  }

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

  showPopup(id: string) {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
      Swal.fire({
        icon: 'error',
        title: 'Form Incomplete',
        text: 'Please fill in all required fields marked with *',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Save',
      text: 'Do you want to save this instructor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        // Map designation to number enum (API POST requirement)
        const designationMap: { [key: string]: number } = {
          'Instructor': 0,
          'Teacher': 0,
          'Professor': 0,
          'Principal': 1,
          'Headmistress': 1,
          'Counselor': 1,
          'Admin': 2,
          'Accountant': 3
        };

        // POST expects 'staff' and designation as number, but GET returns 'staffName' and designation as string
        console.log('📝 Form designation value:', this.newStaff.designation);
        console.log('🔢 Mapped designation number:', designationMap[this.newStaff.designation]);
        
        const staffData = {
          staffName: this.newStaff.staffName,  // POST expects 'staff' not 'staffName'
          gender: this.newStaff.gender,
          dob: this.newStaff.dob,
          contactNumber1: this.newStaff.contactNumber1,
          email: this.newStaff.email,
          qualifications: this.newStaff.qualifications,
          joiningDate: this.newStaff.joiningDate,
          designation: this.newStaff.designation,  // POST expects number (0-3)
          permanentAddress: this.newStaff.permanentAddress,
          status: this.newStaff.status,
          uniqueStaffAttendanceNumber:1234


        };

        console.log('🚀 Sending staff data to API:', staffData);
        console.log('📤 JSON:', JSON.stringify(staffData, null, 2));


        this.staffService.addStaff(staffData).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Instructor Added Successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/staff-list']);
          },
          error: (err) => {
            console.error('❌ Full error:', err);
            let errorMessage = 'Something went wrong!';
            if (err.error) {
              if (typeof err.error === 'string') errorMessage = err.error;
              else if (err.error.message) errorMessage = err.error.message;
              else if (err.error.errors) {
                const errors = Object.values(err.error.errors).flat();
                errorMessage = errors.join(', ');
              } else {
                errorMessage = JSON.stringify(err.error);
              }
            }

            Swal.fire({
              icon: 'error',
              title: 'Failed to Add Instructor',
              text: errorMessage,
              footer: `Status: ${err.status}`
            });
          }
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/staff-list']);
  }

  ngAfterViewInit(): void {}
}
