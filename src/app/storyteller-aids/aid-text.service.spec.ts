import { AidTextService } from './aid-text.service';
import { YOU_ARE_EVIL, YOUR_SECRET_WORD_IS } from './storyteller-aid-library';

describe('AidTextService', () => {
  let service: AidTextService;

  beforeEach(() => {
    localStorage.clear();
    service = new AidTextService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows each aid as it comes to begin with', () => {
    expect(service.written(YOUR_SECRET_WORD_IS)).toBe(YOUR_SECRET_WORD_IS);
    expect(service.written(YOUR_SECRET_WORD_IS).sentence).toBe('Your secret word is haberdashery');
  });

  it("writes the storyteller's words into a custom aid", () => {
    service.write(YOUR_SECRET_WORD_IS, 'pickle');
    expect(service.written(YOUR_SECRET_WORD_IS).sentence).toBe('Your secret word is pickle');
    expect(service.written(YOUR_SECRET_WORD_IS).id).toBe(YOUR_SECRET_WORD_IS.id);
  });

  it('tidies away extra spaces', () => {
    service.write(YOUR_SECRET_WORD_IS, '  red   herring ');
    expect(service.written(YOUR_SECRET_WORD_IS).editableText).toBe('red herring');
  });

  it('puts the words the aid comes with back when given none, or those same words', () => {
    service.write(YOUR_SECRET_WORD_IS, 'pickle');
    service.write(YOUR_SECRET_WORD_IS, '   ');
    expect(service.written(YOUR_SECRET_WORD_IS)).toBe(YOUR_SECRET_WORD_IS);
    service.write(YOUR_SECRET_WORD_IS, 'pickle');
    service.write(YOUR_SECRET_WORD_IS, 'haberdashery');
    expect(service.written(YOUR_SECRET_WORD_IS)).toBe(YOUR_SECRET_WORD_IS);
  });

  it('leaves an aid without editable words as it is', () => {
    service.write(YOU_ARE_EVIL, 'pickle');
    expect(service.written(YOU_ARE_EVIL)).toBe(YOU_ARE_EVIL);
  });

  it('remembers the words across a refresh', () => {
    service.write(YOUR_SECRET_WORD_IS, 'pickle');
    expect(new AidTextService().written(YOUR_SECRET_WORD_IS).editableText).toBe('pickle');
  });

  it('shows each aid as it comes when what was saved is unreadable', () => {
    for (const saved of ['{not json', '["pickle"]', '{"your-secret-word-is":7}', '{"your-secret-word-is":"  "}']) {
      localStorage.setItem('clocktower-storyteller-aid-text', saved);
      expect(new AidTextService().written(YOUR_SECRET_WORD_IS)).withContext(saved).toBe(YOUR_SECRET_WORD_IS);
    }
  });
});
