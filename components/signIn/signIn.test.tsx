import { it, describe, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Mock } from 'vitest';
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

import { handleSubmit } from '@/lib/actions/authentication'

import SignIn from './index';

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));
vi.mock('@/lib/actions/authentication', { spy: true });

const mockSignIn = signIn as Mock;
const mockRedirect = redirect as unknown as Mock;

describe('<SignIn />', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockRedirect.mockClear();
  });

  it('Sign in should work', async () => {
    mockSignIn.mockResolvedValue({
      error: null,
      status: 200,
      ok: true,
      url: '/dashboard',
    });

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const passwordInput = screen.getByPlaceholderText('tu contraseña');
    const button = screen.getByText('Ingresar');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'usuario@example.com',
        password: 'contraseña123',
        callbackUrl: '/dashboard',
        redirect: false,
      })
      expect(mockRedirect).toHaveBeenCalledWith('/dashboard')
      expect(handleSubmit).toBeCalled()
      expect(handleSubmit).toReturnWith(Promise.resolve(''))
    });
  });

  it('should show error message when fields are empty', async () => {
    render(<SignIn />);

    const button = screen.getByText('Ingresar');

    await act(async () => fireEvent.click(button));

    await waitFor(() => {
      const errorMessage = screen.getAllByText('Completa este campo')
      expect(errorMessage[0]).toBeInTheDocument();
      expect(errorMessage).toHaveLength(2)
    });
  });

  it('should show loader, disable fields and button when is loading', async () => {
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const passwordInput = screen.getByPlaceholderText('tu contraseña');
    const button = screen.getByText('Ingresar');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button.children).toHaveLength(2);
      expect(button.children[0].ariaLabel).toBe('Loading');
      expect(button).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button.getAttribute("data-loading")).not.toBe('true')
      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(passwordInput).toBeEmptyDOMElement();
      expect(emailInput).toBeEmptyDOMElement();
    });
  });
});