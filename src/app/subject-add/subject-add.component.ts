import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

interface Subject {
  subjectName: string;
  marks: number | null;
}

@Component({
  selector: 'app-subject-add',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubjectAddComponent implements OnInit {
  title = 'Add Subject';
  classes: any[] = [];
  selectedClass: string = '';
  
  subjects: Subject[] = [
    { subjectName: '', marks: null }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load classes from localStorage
    const classList = JSON.parse(localStorage.getItem('classList') || '[]');
    this.classes = classList;

    if (this.classes.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Classes Found',
        text: 'Please add a class first before creating subjects.',
        confirmButtonText: 'OK'
      });
    }
  }

  // Add more subject fields
  addMoreSubject(): void {
    this.subjects.push({ subjectName: '', marks: null });
  }

  // Remove subject field
  removeSubject(index: number): void {
    if (this.subjects.length > 1) {
      this.subjects.splice(index, 1);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Remove',
        text: 'At least one subject is required.',
        confirmButtonColor: '#3085d6'
      });
    }
  }

  async onSubmit(form: any): Promise<void> {
    // Validate form
    if (!this.selectedClass) {
      Swal.fire({
        icon: 'error',
        title: 'Class Required',
        text: 'Please select a class.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    // Validate subjects
    const invalidSubject = this.subjects.find(s => !s.subjectName || !s.marks);
    if (invalidSubject) {
      Swal.fire({
        icon: 'error',
        title: 'Form Incomplete',
        text: 'Please fill in all subject names and marks.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: 'Confirm Save',
      text: `Are you sure you want to save ${this.subjects.length} subject(s)?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Save',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });

    if (confirmResult.isConfirmed) {
      // Save to localStorage
      const savedSubjects = JSON.parse(localStorage.getItem('subjectList') || '[]');
      
      this.subjects.forEach(subject => {
        const newSubject = {
          id: savedSubjects.length + 1,
          className: this.selectedClass,
          subjectName: subject.subjectName,
          marks: subject.marks,
          createdAt: new Date().toISOString()
        };
        savedSubjects.push(newSubject);
      });
      
      localStorage.setItem('subjectList', JSON.stringify(savedSubjects));

      await Swal.fire({
        icon: 'success',
        title: 'Subjects Added Successfully!',
        text: 'Redirecting to subject list...',
        showConfirmButton: false,
        timer: 1800
      });

      // Redirect after short delay
      this.router.navigate(['/subject-list']);
    }
  }
}
