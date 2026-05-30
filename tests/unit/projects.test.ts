import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug } from '@/lib/projects';

describe('projects data module', () => {
  it('exports the expected number of projects', () => {
    expect(projects).toHaveLength(3);
  });

  it('all project slugs are non-empty strings', () => {
    for (const p of projects) {
      expect(typeof p.id).toBe('string');
      expect(p.id.length).toBeGreaterThan(0);
    }
  });

  it('all project slugs are unique', () => {
    const ids = projects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('getProjectBySlug returns the correct project', () => {
    const project = getProjectBySlug('portal-paciente');
    expect(project).toBeDefined();
    expect(project!.id).toBe('portal-paciente');
    expect(project!.title).toBe('Portal do Paciente - Clínica de Especialidades');
  });

  it('getProjectBySlug returns undefined for a missing slug', () => {
    const project = getProjectBySlug('does-not-exist');
    expect(project).toBeUndefined();
  });

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.desafio).toBeTruthy();
      expect(p.solucao).toBeTruthy();
      expect(p.resultado).toBeTruthy();
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.image).toBeTruthy();
    }
  });

  it('each project has a complete caseStudy', () => {
    for (const p of projects) {
      expect(p.caseStudy.title).toBeTruthy();
      expect(p.caseStudy.client).toBeTruthy();
      expect(Array.isArray(p.caseStudy.tags)).toBe(true);
      expect(p.caseStudy.challenge).toBeTruthy();
      expect(p.caseStudy.approach).toBeTruthy();
      expect(p.caseStudy.result).toBeTruthy();
      expect(Array.isArray(p.caseStudy.metrics)).toBe(true);
      expect(p.caseStudy.metrics.length).toBeGreaterThan(0);
      expect(Array.isArray(p.caseStudy.technicalHighlights)).toBe(true);
      expect(p.caseStudy.technicalHighlights.length).toBeGreaterThan(0);
    }
  });

  it('getProjectBySlug covers all known slugs', () => {
    for (const p of projects) {
      const found = getProjectBySlug(p.id);
      expect(found).toBeDefined();
      expect(found!.id).toBe(p.id);
    }
  });
});
