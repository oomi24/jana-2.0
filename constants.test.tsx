
import { WARRIORS, LEVELS, MOTIVATIONAL_QUOTES, KPOP_CREATIVE_CHALLENGES, ART_DATABASE, GEO_DATABASE, ENGLISH_DATABASE, SCIENCE_DATABASE, READING_DATABASE } from './constants.ts';
import { describe, it, expect } from 'vitest';

describe('Constants', () => {
  describe('WARRIORS', () => {
    it('should have 6 warriors', () => {
      expect(Object.keys(WARRIORS).length).toBe(6);
    });

    it('should have the correct properties for each warrior', () => {
      for (const warriorId in WARRIORS) {
        const warrior = WARRIORS[warriorId as keyof typeof WARRIORS];
        expect(warrior).toHaveProperty('id');
        expect(warrior).toHaveProperty('name');
        expect(warrior).toHaveProperty('title');
        expect(warrior).toHaveProperty('subject');
        expect(warrior).toHaveProperty('color');
        expect(warrior).toHaveProperty('gradient');
        expect(warrior).toHaveProperty('description');
        expect(warrior).toHaveProperty('icon');
      }
    });
  });

  describe('LEVELS', () => {
    it('should have 600 levels', () => {
      expect(LEVELS.length).toBe(600);
    });

    it('should have the correct properties for each level', () => {
      for (const level of LEVELS) {
        expect(level).toHaveProperty('id');
        expect(level).toHaveProperty('moduleId');
        expect(level).toHaveProperty('index');
        expect(level).toHaveProperty('rewardId');
        expect(level).toHaveProperty('help');
        expect(level).toHaveProperty('type');
        expect(level).toHaveProperty('objective');
      }
    });
  });

  describe('MOTIVATIONAL_QUOTES', () => {
    it('should have 5 quotes', () => {
      expect(MOTIVATIONAL_QUOTES.length).toBe(5);
    });
  });

  describe('KPOP_CREATIVE_CHALLENGES', () => {
    it('should have 10 challenges', () => {
      // @ts-ignore
      expect(KPOP_CREATIVE_CHALLENGES.length).toBe(10);
    });
  });

  describe('ART_DATABASE', () => {
    it('should have 3 items', () => {
      // @ts-ignore
      expect(ART_DATABASE.length).toBe(3);
    });
  });

  describe('GEO_DATABASE', () => {
    it('should have 4 categories', () => {
      expect(Object.keys(GEO_DATABASE).length).toBe(4);
    });
  });

  describe('ENGLISH_DATABASE', () => {
    it('should have 2 items', () => {
      // @ts-ignore
      expect(ENGLISH_DATABASE.length).toBe(2);
    });
  });

  describe('SCIENCE_DATABASE', () => {
    it('should have 1 item', () => {
      // @ts-ignore
      expect(SCIENCE_DATABASE.length).toBe(1);
    });
  });

  describe('READING_DATABASE', () => {
    it('should have 100 items', () => {
      expect(READING_DATABASE.length).toBe(100);
    });
  });
});
