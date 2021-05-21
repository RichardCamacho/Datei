import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicExperienceService } from 'src/app/academic-experience/academic-experience/academic-experience.service';
import { AwardsService } from 'src/app/awards/awards/awards.service';
import { CertificationsService } from 'src/app/certifications/certifications/certifications.service';
import { NoAcademicExperienceService } from 'src/app/no-academic-experience/no-academic-experience/no-academic-experience.service';
import { OrganizationsService } from 'src/app/organizations/organizations/organizations.service';
import { ProfessionalActivitiesService } from 'src/app/professional-activities/professional-activities/professional-activities.service';
import { PublicationsService } from 'src/app/publications/publications/publications.service';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { SchoolingService } from 'src/app/schooling/schooling/schooling.service';
import { ServiceActivitiesService } from 'src/app/service-activities/service-activities/service-activities.service';
import { RegisterUsersService } from 'src/app/users/register-users/register-users.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaeService {

  gateway = CONFIG.gateway;
  
  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService,
              private registerUserService: RegisterUsersService, 
              private schoolingService: SchoolingService,
              private academicExperienceService: AcademicExperienceService,
              private noAcademicExperienceService: NoAcademicExperienceService,
              private certificationService: CertificationsService,
              private organizationService: OrganizationsService,
              private awardService: AwardsService,
              private serviceActivitiesService: ServiceActivitiesService,
              private publicationsService: PublicationsService,
              private professionalActivitiesService: ProfessionalActivitiesService,
              ) { }

  //registrar una hoja de vida
  registerCurriculum(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-curriculum`, args);
  }

  //obtener una hoja de vida por id de usuario
  getCurriculumByIdUser(id) {
    return this.http.get(`${this.gateway.url}/api/curriculum/${id}`);
  }

  //editar la informacion de una hoja de vida
  updateCurriculum(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-curriculum/${id}`, args);
  }

  //editar la fecha de actualización de una hoja de vida
  updateDateCurriculum(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-date-curriculum/${id}`, args);
  }

  //obtener los detalles del usuario en sesion
  getUser(id){
    return this.registerUserService.getUserById(id);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }

  //listas de detalles de la hoja de vida
  //estudios
  getEstudios(idHv){
    return this.schoolingService.getSchoolingByHv(idHv);
  }
  deleteSchooling(id){
    return this.schoolingService.deleteSchooling(id);
  }

  //experiencia academica
  getExperienciaAcademica(idHv){
    return this.academicExperienceService.getAcademicExpByHv(idHv);
  }
  deleteAcademicExp(id){
    return this.academicExperienceService.deleteAcademicExp(id);
  }

  //experiencia no academica
  getExperienciaNoAcademica(idHv){
    return this.noAcademicExperienceService.getNoAcademicExpByHv(idHv);
  }
  deleteNoAcademicExp(id){
    return this.noAcademicExperienceService.deleteNoAcademicExp(id);
  }

  //certificaciones
  getCertificaciones(idHv){
    return this.certificationService.getCertificationByHv(idHv);
  }
  deleteCertification(id){
    return this.certificationService.deleteCertification(id);
  }

  //organizaciones
  getOrganizaciones(idHv){
    return this.organizationService.getOrganizationByHv(idHv);
  }
  deleteOrganization(id){
    return this.organizationService.deleteOrganization(id);
  }

  //publicaciones
  getPublicaciones(idHv){
    return this.publicationsService.getPublicationByHv(idHv);
  }
  deletePublication(id){
    return this.publicationsService.deletePublication(id);
  }

  //actividades profesionales
  getActividadProfesional(idHv){
    return this.professionalActivitiesService.getProfessionalActivityByHv(idHv);
  }
  deleteProfessionalActivity(id){
    return this.professionalActivitiesService.deleteProfessionalActivity(id);
  }

  //honores y premios
  getPremios(idHv){
    return this.awardService.getAwardByHv(idHv);
  }
  deleteAward(id){
    return this.awardService.deleteAward(id);
  }

  //actividades de servicio
  getActividadServicio(idHv){
    return this.serviceActivitiesService.getServiceActivityByHv(idHv);
  }
  deleteServiceActivity(id){
    return this.serviceActivitiesService.deleteServiceActivity(id);
  }
}
