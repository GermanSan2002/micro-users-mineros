import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../modules/mail/mail.service';
import * as nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

describe('MailService', () => {
  let service: MailService;
  let transporter: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'MAIL_HOST':
                  return 'smtp.example.com';
                case 'MAIL_PORT':
                  return 587;
                case 'MAIL_USER':
                  return 'user@example.com';
                case 'MAIL_PASS':
                  return 'password';
                case 'MAIL_FROM':
                  return 'from@example.com';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    transporter = nodemailer.createTransport();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should configure the transporter with the correct settings', () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.example.com',
      port: 587,
      auth: {
        user: 'user@example.com',
        pass: 'password',
      },
    });
  });

  it('should send an email with the correct options', async () => {
    const sendMailMock = jest
      .spyOn(transporter, 'sendMail')
      .mockResolvedValue(true);

    await service.sendMail(
      'to@example.com',
      'Subject',
      'Text content',
      '<p>HTML content</p>',
    );

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'from@example.com',
      to: 'to@example.com',
      subject: 'Subject',
      text: 'Text content',
      html: '<p>HTML content</p>',
    });
  });
});
