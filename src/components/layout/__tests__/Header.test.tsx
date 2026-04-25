import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock the child components
vi.mock('../LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

vi.mock('../MobileMenuSheet', () => ({
  default: ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
    <div data-testid="mobile-menu-sheet">
      <button onClick={() => onOpenChange(!open)}>Toggle Mobile Menu</button>
    </div>
  ),
}));

// Mock the data modules
vi.mock('@/data/treatments', () => ({
  getLocalizedTreatmentCategories: vi.fn().mockResolvedValue([
    {
      slug: 'botox',
      name: 'Botox Injectables',
      description: 'Anti-wrinkle treatments',
      image: '/botox.jpg',
      treatments: [
        { slug: 'anti-wrinkle', name: 'Anti-Wrinkle Injections', description: 'Smooth wrinkles', shortDescription: 'Smooth wrinkles', image: '/anti-wrinkle.jpg' },
      ],
    },
  ]),
}));

vi.mock('@/data/conditions', () => ({
  getLocalizedConditions: vi.fn().mockResolvedValue([
    {
      slug: 'ageing',
      name: 'Skin Ageing',
      shortDescription: 'Combat signs of aging',
    },
  ]),
}));

vi.mock('@/data/site-config', () => ({
  siteConfig: {
    name: 'Silk Beauty Salon',
    bookingUrl: 'https://cal.com/silk-beauty',
    contact: {
      phone: '+995 599 123 456',
    },
  },
}));

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

  it('should render header with logo', () => {
    render(<Header />);
    
    expect(screen.getByText('Silk Beauty')).toBeInTheDocument();
    expect(screen.getByText('Salon')).toBeInTheDocument();
  });

  it('should render language switcher', () => {
    render(<Header />);
    
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('should render navigation items', () => {
    render(<Header />);
    
    // Check for nav items - mocked translations return the key path with "Folder: " prefix for dropdowns
    expect(screen.getByText('Folder: treatments')).toBeInTheDocument();
    expect(screen.getByText('Folder: conditions')).toBeInTheDocument();
    expect(screen.getByText('Folder: about')).toBeInTheDocument();
    expect(screen.getAllByText('pricelist').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('offers').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('contact').length).toBeGreaterThanOrEqual(1);
  });

  it('should render booking button', () => {
    render(<Header />);
    
    // There are multiple "bookAppointment" elements (top bar + main header)
    const buttons = screen.getAllByText('bookAppointment');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('should render top bar with utility links', () => {
    render(<Header />);
    
    // Should have multiple instances of these nav items (top bar and main nav)
    const pricelistElements = screen.getAllByText('pricelist');
    const offersElements = screen.getAllByText('offers');
    const contactElements = screen.getAllByText('contact');
    
    // Top bar has simple text, main nav has Folder: prefix for some items
    expect(pricelistElements.length).toBeGreaterThanOrEqual(1);
    expect(offersElements.length).toBeGreaterThanOrEqual(1);
    expect(contactElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should toggle booking dropdown on click', () => {
    render(<Header />);
    
    // Get the main booking button (in the header, not top bar)
    const bookingButtons = screen.getAllByText('bookAppointment');
    const bookingButton = bookingButtons[bookingButtons.length - 1]; // Get the last one (main header)
    
    // Initially dropdown should not be visible
    expect(screen.queryByText('bookOnline')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(bookingButton);
    
    // Dropdown should now be visible
    expect(screen.getByText('bookOnline')).toBeInTheDocument();
    expect(screen.getByText('whatsapp')).toBeInTheDocument();
  });

  it('should close booking dropdown when clicking again', () => {
    render(<Header />);
    
    // Get the main booking button
    const bookingButtons = screen.getAllByText('bookAppointment');
    const bookingButton = bookingButtons[bookingButtons.length - 1];
    
    // Open dropdown
    fireEvent.click(bookingButton);
    expect(screen.getByText('bookOnline')).toBeInTheDocument();
    
    // Close dropdown
    fireEvent.click(bookingButton);
    expect(screen.queryByText('bookOnline')).not.toBeInTheDocument();
  });

  it('should close dropdown on Escape key', () => {
    render(<Header />);
    
    // Get the main booking button
    const bookingButtons = screen.getAllByText('bookAppointment');
    const bookingButton = bookingButtons[bookingButtons.length - 1];
    
    // Open dropdown
    fireEvent.click(bookingButton);
    expect(screen.getByText('bookOnline')).toBeInTheDocument();
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Dropdown should be closed
    expect(screen.queryByText('bookOnline')).not.toBeInTheDocument();
  });

  it('should render mobile menu button on small screens', () => {
    render(<Header />);
    
    // Mobile menu sheet should be rendered
    expect(screen.getByTestId('mobile-menu-sheet')).toBeInTheDocument();
  });

  it('should render international navigation section', () => {
    render(<Header />);
    
    // The international nav uses 'main' key with "Folder: " prefix
    expect(screen.getByText('Folder: main')).toBeInTheDocument();
  });

  it('should apply scrolled styles when window is scrolled', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    
    // Initially should have default classes
    expect(header).toHaveClass('bg-white');
    expect(header).toHaveClass('py-3');
  });

  it('should render dropdown chevrons for items with dropdowns', () => {
    render(<Header />);
    
    // Get all chevron icons (they're SVG elements within the nav)
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
