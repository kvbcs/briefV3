import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GroupPageComponent } from './group-page.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { of, throwError } from 'rxjs';
import { GroupGenerationConfig } from '../../models/group.model';

describe('GroupPageComponent', () => {
  let component: GroupPageComponent;
  let fixture: ComponentFixture<GroupPageComponent>;

  const mockConfig: GroupGenerationConfig = {
    listId: 'mock-list-id',
    numberOfGroups: 2,
    mixGender: true,
    mixAge: false,
    mixDWWM: true,
    mixLevel: false,
  };

  const mockGroups = [
    { name: 'Groupe 1', members: [{ id: '1', name: 'Alice' }] },
    { name: 'Groupe 2', members: [{ id: '2', name: 'Bob' }] },
  ];

  const mockGroupService = {
    generateGroups: jasmine.createSpy('generateGroups').and.returnValue(of(mockGroups)),
    validateGroups: jasmine.createSpy('validateGroups').and.returnValue(of({ success: true })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPageComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { listId: 'mock-list-id' },
        },
        {
          provide: GroupService,
          useValue: mockGroupService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
  });

  it('should receive listId from MAT_DIALOG_DATA', () => {
    expect(component.data.listId).toBe('mock-list-id');
  });

  it('should call groupService.generateGroups when onGenerate() is called with config', () => {
    component.onGenerate(mockConfig);
    expect(mockGroupService.generateGroups).toHaveBeenCalledWith(mockConfig);
  });

  it('should update groups when onGenerate is called', fakeAsync(() => {
  component.onGenerate(mockConfig);
  tick();
  console.log('groups:', component.groups());
  expect(component.groups()).toEqual(mockGroups);
}));


  it('should handle errors when group generation fails', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');

    mockGroupService.generateGroups.and.returnValue(throwError(() => new Error('Erreur simulée')));

    component.onGenerate(mockConfig);
    tick();

    expect(consoleSpy).toHaveBeenCalledWith('Erreur lors de la génération des groupes ❌', jasmine.any(Error));
    expect(component.groups()).toEqual([]);
  }));

  it('should call validateGroups on onValidate()', fakeAsync(() => {
    component.onValidate(mockGroups);
    tick();
    expect(mockGroupService.validateGroups).toHaveBeenCalledWith(mockGroups);
  }));

  it('should log error on validateGroups failure', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');
    mockGroupService.validateGroups.and.returnValue(throwError(() => new Error('Erreur de validation')));

    component.onValidate(mockGroups);
    tick();

    expect(consoleSpy).toHaveBeenCalledWith("Erreur lors de l'enregistrement des groupes ❌", jasmine.any(Error));
  }));
});
