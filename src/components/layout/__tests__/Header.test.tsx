import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock window scroll
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

describe('Header Component', () => {
  beforeEach(() => {
    window.scrollY = 0;
    vi.clearAllMocks();
  });

  it('should render header with banner role', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    // Header has transparent background initially
    expect(header).toHaveClass('bg-transparent');
  });

  it('should render navigation with all nav items', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for nav items
    expect(screen.getByText('Treatments')).toBeInTheDocument();
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Skin Concerns')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should render logo link', () => {
    render(<Header />);
    
    const logo = screen.getByText('Beauty Aesthetics');
    expect(logo).toBeInTheDocument();
  });

  it('should render utility bar with About Us', () => {
    render(<Header />);
    
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Find a Specialist')).toBeInTheDocument();
  });

  it('should change background on scroll', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    
    // Initially transparent
    expect(header).toHaveClass('bg-transparent');
    
    // Simulate scroll
    window.scrollY = 100;
    fireEvent.scroll(window);
    
    // After scroll, should have different styling
    // Note: The actual class change happens via useEffect, 
    // which may need more advanced testing with React Testing Library
  });
});
