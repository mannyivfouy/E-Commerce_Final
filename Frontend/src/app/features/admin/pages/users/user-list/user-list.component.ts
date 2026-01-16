import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../../models/users';
import { PaginationComponent } from '../../../../../shared/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../../api/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [PaginationComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  paginatedUsers: Users[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  private searchTerm = '';
  private debounceTimer: number | null = null;
  private debounceMs = 300;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.users;
        this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
        this.updatePage();
      },
      error: (err) => {
        console.log('Error Fectching Users', err);
      },
    });
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(
      start,
      start + this.itemsPerPage
    );
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value ?? '';

    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.searchTerm = value.trim().toLocaleLowerCase();
      this.currentPage = 1;
      this.updatePage();
      this.debounceTimer = null;
    }, this.debounceMs);
  }

  get filteredUsers(): Users[] {
    if (!this.searchTerm) return this.users;

    return this.users.filter(
      (u) =>
        (u.username || '').toLowerCase().includes(this.searchTerm) ||
        (u.fullname || '').toLowerCase().includes(this.searchTerm)
    );
  }

  confirmAndDelete(_id?: string): void {
    if (!_id) {
      console.warn('Canot Delete This User');
      return;
    }

    if (!confirm('Delete This User? This Action Cannot Be Undone')) return;

    this.userService.deleteUserById(_id).subscribe({
      next: () => {
        const deleteUser = this.users.find((u) => u._id === _id);
        this.users = this.users.filter((u) => u._id !== _id);
        this.getAllUsers();
      },
      error: (err) => alert(err?.error?.message || 'Delete Field'),
    });
  }
}
