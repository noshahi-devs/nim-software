import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

declare var bootstrap: any;

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements AfterViewInit {
  title = 'Add Student';
  private readonly STORAGE_KEY = 'studentList';
  formSubmitted = false;

  // ✅ Student object
  newStudent = {
    id: 0,
    name: '',
    rollNo: '',
    gender: '',
    dob: '',
    class: '',
    section: '',
    profile: 'assets/images/user-grid/user-grid-img2.png',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
    admissionDate: '',
    previousSchool: '',
    status: '',
    bg: 'assets/images/user-grid/user-grid-bg1.png'
  };

  constructor(private router: Router) {
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    // Set default values for required fields
    this.newStudent.name = '';
    this.newStudent.rollNo = '001';
    this.newStudent.gender = 'male';
    this.newStudent.dob = '2010-01-01';
    this.newStudent.class = '9';
    this.newStudent.section = 'A';
    this.newStudent.phone = '';
    this.newStudent.guardianName = '';
    this.newStudent.guardianPhone = '';
    this.newStudent.address = 'Gojra';
    this.newStudent.admissionDate = new Date().toISOString().split('T')[0];
    this.newStudent.previousSchool = 'Punjab College Gojra';
    this.newStudent.status = 'active';
  }

  // ✅ LocalStorage handlers
  loadStudentFromStorage(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveStudentToStorage(studentList: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(studentList));
  }

  // ✅ Image Upload
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newStudent.profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ Popup helper
  showPopup(id: string) {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
onSubmit(form: NgForm): void {
  this.formSubmitted = true;
  form.form.markAllAsTouched();

  if (form.invalid) {
    this.showPopup('validationModal');
    return;
  }

  const studentList = this.loadStudentFromStorage();
  const newId = studentList.length > 0 ? Math.max(...studentList.map((s: any) => s.id)) + 1 : 1;

  const studentToAdd = { id: newId, ...this.newStudent };
  studentList.push(studentToAdd);
  this.saveStudentToStorage(studentList);

  this.showPopup('successModal');

  setTimeout(() => {
    // ✅ Close modal properly
    const modalEl = document.getElementById('successModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    // ✅ Remove leftover backdrop if any
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());

    // ✅ Navigate safely
    this.router.navigate(['/student-list']);
  }, 1200);
}


  cancel(): void {
    this.router.navigate(['/student-list']);
  }

  ngAfterViewInit(): void {}
}
