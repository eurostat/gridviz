/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '../../core/core.module';
import { Router } from '@angular/router';
import { RouterMock } from '../../shared/testing/router.mock';
import { Module1Component } from './module1.component';

describe('Module1Component', () => {
    let component: Module1Component;
    let fixture: ComponentFixture<Module1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                Module1Component
            ],
            imports: [
                CoreModule,
            ],
            providers: [
                { provide: Router, useClass: RouterMock },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Module1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
