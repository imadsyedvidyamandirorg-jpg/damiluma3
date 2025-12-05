import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface AppDefinition {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
  minimized?: boolean;
}

export enum SystemState {
  BOOT = 'BOOT',
  LOGIN = 'LOGIN',
  DESKTOP = 'DESKTOP'
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}