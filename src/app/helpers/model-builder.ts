import { TrainingAccount } from './../account/training-account';
import { Supplier } from './../supplier/supplier';
import { Exam } from './../exam/exam';
import { TrainingSubject } from './../training-subject/training-subject';
import { PresetText } from './../preset-text/preset-text';
import { Sitecheck } from './../sitecheck/sitecheck';
import { Equipment } from './../equipment/equipment';
import { Calibration } from './../calibration/calibration';
import { Role } from './../roles/role';
import { MotTraining } from './../mot-training/mot-training';
import { MotAssessment } from './../mot-assessment/mot-assessment';
import { MotClassGroup } from './../mot-class-group/mot-class-group';
import { Address } from './../address/address';
import { PersonnelAccount } from './../personnel/personnel-account';
import { Account } from '../account/account';
import { User } from './../user/user';
import { Personnel } from './../personnel/personnel';
import * as Bluebird from 'bluebird';
import { Template } from '../template/template';
import { TemplateType } from '../template/template-type';
import { Question } from '../questions/question';
import { DashTrainingAssessmentTotals } from '../dashboard/training-assess-totals';
import { SitecheckCalendar } from '../sitecheck/sitecheckCalendar';
import { SitecheckAction } from '../sitecheck/sitecheck-action';
import { Answer } from '../answer/answer';
import { Qc } from '../qc/qc';

export class ModelBuilder {

  public static async createPersonnel(d): Promise<Personnel> {

    const personnel: Personnel = await new Personnel(
      d.id, d.name, d.address_id, d.email, d.telephone, d.mobile, d.fax,
      d.driving_licence_no, d.nt_number, d.mot_class, d.is_active,
      d.date_employed, d.date_of_birth, d.created_at, d.updated_at
    );




    if (d.accounts !== undefined) {
      personnel.accounts = await Bluebird.map(d.accounts, async (a) => {
        return this.createPersonnelAccount(a);
      });
    }


    if (d.mot_groups !== undefined) {
      personnel.motGroups = await Bluebird.map(d.mot_groups, async (g) => {
        return this.createMotClassGroup(g);
      });
    }

    if (d.mot_assessments) {
      personnel.motAssessments = await Bluebird.map(d.mot_assessments, async (a) => {
        return this.createMotAssessment(a);
      });
    }

    if (d.mot_training !== undefined) {
      personnel.motTraining = await Bluebird.map(d.mot_training, async (t) => {
        return this.createMotTraining(t);
      });
    }

    if (d.address) {
      personnel.address = await this.createAddress(d.address);
    }

    if (d.roles !== undefined) {
      personnel.roles = await Bluebird.map(d.roles, async (r) => {
        return this.createRole(r);
      });
    }

    if (d.user) {
      personnel.user = await this.createUser(d.user);
    }


    return personnel;
  }

  public static async createUser(d): Promise<User> {
    const user = await new User(
      d.id, d.username, d.personnelId
    );

    if (d.personnel !== undefined) {
      user.personnel = await this.createPersonnel(d.personnel);
    }

    return user;
  }

  public static async createPersonnelAccount(d): Promise<Account> {
    const account: PersonnelAccount = await new PersonnelAccount(
      d, d.leave_date
    );

    if (d.personnel !== undefined) {
      account.personnel = await Bluebird.map(d.personnel, async (p) => {
        return this.createPersonnel(p);
      });
    }

    if (d.address !== undefined) {
      account.address = await this.createAddress(d.address);
    }

    return account;
  }

  public static async createAccount(d): Promise<Account> {
    const account: Account = await new Account(
      d.id, d.code, d.name, d.address_id,
      d.alias_name, d.ae_number, d.vts_number, d.mot_class,
      d.dvsa_office, d.feature_level, d.parent_id, d.group_id, d.sitecheck_start,
      d.sitecheck_count, d.updated_at, d.created_at
    );

    if (d.personnel) {
      account.personnel = await Bluebird.map(d.personnel, async (p) => {
        return this.createPersonnel(p);
      });
    }

    if (d.address) {
      account.address = await this.createAddress(d.address);
    }

    return account;
  }

  public static async createAddress(d): Promise<Address> {
    return await new Address(
      d.id, d.address_1, d.address_2, d.address_3, d.address_4,
      d.postcode, d.created_at, d.updated_at
    );
  }

  public static async createCalibration(d): Promise<Calibration> {
    const calibration: Calibration = await new Calibration(
      d.id, d.equipment_id, d.sitecheck_id, d.personnel_id, d.supplier_id,
      d.date_entered, d.certificate_ref
    );

    if (d.equipment !== undefined) {
      calibration.equipment = await this.createEquipment(d.equipment);
    }

    if (d.personnel !== undefined) {
      calibration.personnel = await this.createPersonnel(d.personnel);
    }

    if (d.sitecheck !== undefined) {
      calibration.sitecheck = await this.createSitecheck(d.sitecheck);
    }

    return calibration;
  }

  public static async createEquipment(d): Promise<Equipment> {
    const equipment: Equipment = await new Equipment(
      d.id, d.account_id, d.text_id, d.make, d.model, d.serial_no,
      d.is_active, d.next_calibration
    );

    if (d.calibrations !== undefined) {
      equipment.calibrations = await Bluebird.map(d.calibrations, (c) => {
        return this.createCalibration(c);
      });
    }

    if (d.text_item !== undefined) {
      equipment.text = await this.createPresetText(d.text_item);
    }

    if (d.Account !== undefined) {
      equipment.account = await this.createAccount(d.account);
    }

    return equipment;
  }

  public static async createRole(d): Promise<Role> {
    return await new Role(
      d.id, d.name
    );
  }

  public static async createMotTraining(d): Promise<MotTraining> {

    const training: MotTraining = new MotTraining(
      d.id, d.personnel_id, d.subject_id, d.total_time, d.date_taken, d.textitem_id, d.comment
    );

    if (d.personnel !== undefined) {
      training.personnel = await this.createPersonnel(d.personnel);
    }

    if (d.subject !== undefined) {
      training.subject = await this.createTrainingSubject(d.subject);
    }

    return training;
  }

  public static async createMotClassGroup(d): Promise<MotClassGroup> {
    return await new MotClassGroup(
      d.id, d.name, d.classes, d.requirements
    );
  }

  public static async createMotAssessment(data): Promise<MotAssessment> {
    const d = data;

    const assessment: MotAssessment = await new MotAssessment(
      d.id, d.personnel_id, d.exam_id, d.date_taken, d.mark, d.certificate_number
    );

    if (d.personnel !== undefined) {
      assessment.personnel = await this.createPersonnel(d.personnel);
    }

    if (d.exam !== undefined) {
      assessment.exam = await this.createExam(d.exam);
    }

    return assessment;
  }

  public static async createTrainingSubject(d): Promise<TrainingSubject> {
    const subject = await new TrainingSubject(
      d.id, d.name, d.active_date_range, d.group_id
    );

    if (d.group !== undefined) {
      subject.group = await this.createMotClassGroup(d.group);
    }

    return subject;
  }

  public static async createExam(d): Promise<Exam> {
    const exam = await new Exam(
      d.id, d.name, d.group_id, d.active_date_range, d.pass_rate
    );

    if (d.group !== undefined) {
      exam.group = await this.createMotClassGroup(d.group);
    }

    return exam;
  }

  public static async createSupplier(d): Promise<Supplier> {

    const supplier: Supplier = await new Supplier(
      d.id, d.name, d.address_id, d.phone, d.email,
      d.type, d.account_id, d.created_at, d.updated_at
    );

    if (d.address !== null) {
      supplier.address = await this.createAddress(d.address);
    }

    return supplier;
  }

  public static async createSitecheck(d): Promise<Sitecheck> {

    const sitecheck: Sitecheck = await new Sitecheck(
      d.id, d.consultant_id, d.account_id, d.date_tested, d.date_due, d.actioned_by_id,
      d.actioned_by_ip, d.rag_score, d.rag_colour, d.rag_date,
      d.report_version, d.template_id, d.created_at, d.updated_at, d.status
    );

    if (d.consultant !== undefined && d.consultant !== null) {
      sitecheck.consultant = await this.createPersonnel(d.consultant);
    }

    if (d.answers !== undefined) {
      sitecheck.answers = await Bluebird.map(d.answers, async (a) => {
        return this.createAnswer(a);
      });
    }

    if (d.account !== undefined) {
      sitecheck.account = await this.createAccount(d.account);
    }

    if (d.actionedBy !== undefined) {
      sitecheck.actionedBy = await this.createPersonnel(d.actionedBy);
    }

    return sitecheck;
  }

  public static async createAnswer(d): Promise<Answer> {
    const answer: Answer = await new Answer(
      d.id, d.question_id, d.document_id, d.value, d.tablename, d.comment
    );

    if (d.question !== null) {
      answer.question = await this.createQuestion(d.question);
    }

    return answer;
  }

  public static async createPresetText(d): Promise<PresetText> {
    const textItem: PresetText = await new PresetText(
      d.id, d.text, d.type
    );

    return textItem;
  }

  public static async createTrainingAccount(account, totals): Promise<TrainingAccount> {
    let totalTraining = 0;
    let requiredTraining = 0;
    let requiredAssessments = 0;
    let totalAssessments = 0;

    let personnelCount = 0;

    // get me my total times for each account
    await Bluebird.each(totals, async (item) => {
      if (item.id === account.id) {
        totalTraining = item.totaltime;
      }
    });

    // get my total hours for personnel on each account
    await Bluebird.map(account.personnel, async (p) => {
      personnelCount++;
      requiredAssessments += p.mot_groups.length;
      totalAssessments += p.mot_assessments.length;
      await Bluebird.map(p.mot_groups, async (g) => {
        requiredTraining += g.requirements.hours_required;
      });

    });

    return await new TrainingAccount(account, totalTraining, requiredTraining, totalAssessments, requiredAssessments, personnelCount);
  }

  public static async createTemplate(d): Promise<Template> {
    const template: Template = await new Template(d.id, d.name, d.sections, d.template_type_id);

    if (d.questions !== undefined) {
      template.questions = d.questions;
    }

    if (d.template_type) {
      template.templateType = await this.createTemplateType(d.template_type);
    }
    return template;
  }

  public static async createTemplateType(d): Promise<TemplateType> {

    const templateType: TemplateType = await new TemplateType(d.id, d.description);

    return templateType;
  }

  public static async createQuestion(d): Promise<Question> {

    const question: Question = await new Question(d.id, d.template_id, d.section, d.question,
      d.question_type, d.order, d.is_rag, d.is_comment, d.answer_values, d.action_text);

    return question;
  }

  public static async createSitecheckAction(d): Promise<SitecheckAction> {


    const action: SitecheckAction = await new SitecheckAction(d.id, d.account_id, d.question_id, d.answer_id, d.actioned_by_id);

    if (d.question !== undefined) {
      action.question = await this.createQuestion(d.question);
    }

    if (d.actionee !== undefined && d.actionee !== null) {
      action.actionee = await this.createPersonnel(d.actionee);
    }

    if (d.answer !== undefined) {
      action.answer = d.answer;
    }

    return action;
  }

  public static async createTrainingAssessTotals(d): Promise<DashTrainingAssessmentTotals> {

    const totals: DashTrainingAssessmentTotals = await new DashTrainingAssessmentTotals(
      d.training_required, d.training_complete, d.exams_passed, d.exam_count, d.tester_count
    );

    return totals;
  }

  public static async createSitecheckCalendar(d): Promise<SitecheckCalendar> {

    const result: SitecheckCalendar = await new SitecheckCalendar(
      d.date_range, d.count
    );

    return result;
  }

  public static async createQc(d): Promise<Qc> {

    const result: Qc = await new Qc(d.id, d.consultant_id, d.technician_id, d.account_id,
      d.date_tested, d.template_id, d.status, d.registration, d.test_number, d.comment, d.motclass_group_id);

    if (d.technician != null) { result.technician = await this.createPersonnel(d.technician); }

    if (d.consultant != null) { result.consultant = await this.createPersonnel(d.consultant); }

    if (d.account) { result.account = await this.createAccount(d.account); }

    if (d.answers) {
      result.answers = await Bluebird.map(d.answers, async (a) => {
        return this.createAnswer(a);
      });
    }

    if (d.group) { result.group = await this.createMotClassGroup(d.group); }

    return result;
  }
}
