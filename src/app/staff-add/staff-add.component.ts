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
  formSubmitted = false;

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
    programDuration: '', // 👈 for associate degree 2-year / 4-year
    gender: '',
    subject: '', // ✅ add this line for qualification subject
    customSubject: '', // ✅ add this line for custom subject
    dob: '',
    email: '',
    qualification: '',
    status: '',
    address: '',
    section: '',
    bg: 'assets/images/user-grid/user-grid-bg1.png'
  };

  constructor(private router: Router) {
    this.setDefaultValues();
  }

  // Set default values
  setDefaultValues(): void {
    // Set defaults for fields
    this.newStaff.experience = '1+';
    this.newStaff.gender = 'male';
    this.newStaff.status = 'active';
    this.newStaff.role = 'teacher';
    this.newStaff.qualification = 'bachelors';
    this.newStaff.subject = 'bsEnglish';
  }

  // Email validation
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
    this.formSubmitted = true;
    
    // Mark form as submitted
    form.form.markAllAsTouched();
    
    if (form.invalid) {
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

