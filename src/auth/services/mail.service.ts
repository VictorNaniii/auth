import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
		host:''
		
	});
  }
}
