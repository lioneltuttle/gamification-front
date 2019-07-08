import { Directive, OnInit, OnDestroy, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountService } from '../services/auth/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirectiveDirective implements OnInit, OnDestroy {

  // the role the user must have 
  @Input('appHasRole') appHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  /**
   * @param {ViewContainerRef} viewContainerRef 
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef 
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService 
   *   -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) { }

  ngOnInit() {

    this.accountService.hasAuthority(this.appHasRole).then(
      b => {
        if (!b) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    );
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }
}