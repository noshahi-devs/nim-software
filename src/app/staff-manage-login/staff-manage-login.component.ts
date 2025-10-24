import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

interface Login {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  campus: string;
  phone: string;
  status: string;
  createdOn: string;
}

@Component({
  selector: 'app-staff-manage-login',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './staff-manage-login.component.html',
  styleUrls: ['./staff-manage-login.component.css']
})
export class StaffManageLoginComponent implements OnInit {
  title = 'Manage Logins';
  Math = Math; // For template usage

  // Data
  logins: Login[] = [];
  filteredLogins: Login[] = [];

  // Dialog
  showDialog: boolean = false;
  isEditMode: boolean = false;

  // Form Data
  loginForm: Login = this.getEmptyForm();
  confirmPassword: string = '';

  // Dropdowns
  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Principal', value: 'Principal' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Accountant', value: 'Accountant' }
  ];

  campuses = [
    { label: 'Main Campus', value: 'Main Campus' },
    { label: 'Girls Campus', value: 'Girls Campus' },
    { label: 'Boys Campus', value: 'Boys Campus' }
  ];

  // Search & Pagination
  searchTerm: string = '';
  rowsPerPage: number = 10;
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadStaffData();
  }

  loadStaffData(): void {
    console.log('Loading staff data...');
    
    // Load from localStorage
    const savedLogins = localStorage.getItem('staffLogins');
    console.log('Saved logins:', savedLogins);
    
    if (savedLogins) {
      this.logins = JSON.parse(savedLogins);
      console.log('Loaded from staffLogins:', this.logins);
    } else {
      // Load staff data from staff list
      const staffData = localStorage.getItem('staffList');
      console.log('Staff data from staffList:', staffData);
      
      if (staffData) {
        const staffList = JSON.parse(staffData);
        console.log('Parsed staff list:', staffList);
        console.log('Staff list length:', staffList.length);
        
        this.logins = staffList.map((staff: any, index: number) => {
          const login = {
            id: index + 1,
            name: staff.name,
            email: staff.email || `${staff.name.toLowerCase().replace(/\s+/g, '.')}@noshahi.edu.pk`,
            password: 'password123', // Default password
            role: staff.role || staff.designation || 'Teacher',
            campus: 'Main Campus', // Default campus
            phone: staff.phone || staff.cnic || 'N/A',
            status: staff.status || 'Active',
            createdOn: staff.joiningDate || new Date().toISOString().split('T')[0]
          };
          console.log(`Mapped staff ${index + 1}:`, login);
          return login;
        });
        
        console.log('Total logins created:', this.logins.length);
        // Save to staffLogins for future use
        this.saveToLocalStorage();
      } else {
        console.log('No staff data found, using mock data');
        // Default mock data if no staff exists
        this.logins = [
          { id: 1, name: 'Ali Khan', email: 'ali@noshahi.edu.pk', role: 'Teacher', campus: 'Main Campus', phone: '0300-1234567', status: 'Active', createdOn: '2023-02-10' },
          { id: 2, name: 'Sara Ahmed', email: 'sara@noshahi.edu.pk', role: 'Principal', campus: 'Girls Campus', phone: '0301-6543210', status: 'Inactive', createdOn: '2022-11-25' }
        ];
      }
    }
    
    this.filteredLogins = [...this.logins];
    console.log('Final logins:', this.logins);
    console.log('Filtered logins:', this.filteredLogins);
  }

  saveToLocalStorage(): void {
    localStorage.setItem('staffLogins', JSON.stringify(this.logins));
  }

  getEmptyForm(): Login {
    return {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: '',
      campus: '',
      phone: '',
      status: 'Active',
      createdOn: new Date().toISOString().split('T')[0]
    };
  }

  // Dialog Methods
  openAddDialog(): void {
    this.isEditMode = false;
    this.loginForm = this.getEmptyForm();
    this.confirmPassword = '';
    this.showDialog = true;
  }

  openEditDialog(login: Login): void {
    this.isEditMode = true;
    this.loginForm = { ...login };
    this.confirmPassword = '';
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.loginForm = this.getEmptyForm();
    this.confirmPassword = '';
  }

  // CRUD Operations
  saveLogin(): void {
    // Validation
    if (!this.loginForm.name || !this.loginForm.email || !this.loginForm.role || !this.loginForm.campus || !this.loginForm.phone) {
      alert('Please fill all required fields');
      return;
    }

    if (!this.isEditMode) {
      if (!this.loginForm.password || !this.confirmPassword) {
        alert('Please enter password');
        return;
      }
      if (this.loginForm.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }

    if (this.isEditMode) {
      // Update existing
      const index = this.logins.findIndex(l => l.id === this.loginForm.id);
      if (index !== -1) {
        this.logins[index] = { ...this.loginForm };
        this.saveToLocalStorage();
        alert('Login updated successfully');
      }
    } else {
      // Add new
      this.loginForm.id = this.logins.length > 0 ? Math.max(...this.logins.map(l => l.id)) + 1 : 1;
      this.logins.push({ ...this.loginForm });
      this.saveToLocalStorage();
      alert('Login added successfully');
    }

    this.searchLogins();
    this.closeDialog();
  }

  deleteLogin(login: Login): void {
    if (confirm(`Are you sure you want to delete ${login.name}?`)) {
    this.logins = this.logins.filter(l => l.id !== login.id);
    this.saveToLocalStorage();  // Saves to localStorage
      alert('Login deleted successfully');
    }
  }

  // Search
  searchLogins(): void {
    if (!this.searchTerm.trim()) {
      this.filteredLogins = [...this.logins];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredLogins = this.logins.filter(login =>
      login.name.toLowerCase().includes(search) ||
      login.email.toLowerCase().includes(search) ||
      login.role.toLowerCase().includes(search) ||
      login.campus.toLowerCase().includes(search)
    );
  }

  // Pagination
  get paginatedLogins(): Login[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredLogins.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLogins.length / this.rowsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
  