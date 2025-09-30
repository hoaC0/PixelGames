import { Component, signal, computed, resource, ChangeDetectionStrategy } from '@angular/core';
import { loadUser } from './user-api'

@Component({
  selector: 'app-async-data-signals',
  imports: [],
  templateUrl: './async-data-signals.html',
  styleUrl: './async-data-signals.less'
})
export class AsyncDataSignals {

  userId = signal(1);

  userResource = resource({
    params: () => ({ id: this.userId() }),
    loader: (params) => loadUser(params.params.id)
  });

  loadUser(id: number) {
    this.userId.set(id);
  }

  reloadUser() {
    this.userResource.reload();
  }

  isLoading = computed(() => this.userResource.status() === 'loading');
  
  hasError = computed(() => this.userResource.status() === 'error');

}
