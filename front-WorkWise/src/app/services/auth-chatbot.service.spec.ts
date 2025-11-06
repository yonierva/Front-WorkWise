import { TestBed } from '@angular/core/testing';

import { AuthChatbotService } from './auth-chatbot.service';

describe('AuthChatbotService', () => {
  let service: AuthChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
