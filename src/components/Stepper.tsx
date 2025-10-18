import React from 'react';
import { cn } from '../lib/utils';

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'active' | 'pending';
}

interface StepperProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'checkmarks' | 'dots' | 'numbers';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Stepper({
  steps,
  orientation = 'horizontal',
  variant = 'checkmarks',
  size = 'md',
  className,
}: StepperProps) {
  // Size classes
  const sizeClasses = {
    sm: {
      circle: 'w-6 h-6',
      icon: 'w-3 h-3',
      text: 'text-sm',
      description: 'text-xs',
      spacing: 'gap-spacing-sm',
    },
    md: {
      circle: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-base',
      description: 'text-sm',
      spacing: 'gap-spacing-md',
    },
    lg: {
      circle: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-lg',
      description: 'text-base',
      spacing: 'gap-spacing-lg',
    },
  };

  const currentSize = sizeClasses[size];

  // Render step icon based on variant and status
  const renderStepIcon = (step: Step, index: number) => {
    const { status } = step;
    const stepNumber = index + 1;

    if (status === 'completed') {
      if (variant === 'checkmarks') {
        return (
          <svg className={currentSize.icon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      } else if (variant === 'numbers') {
        return <span className="text-white font-semibold">{stepNumber}</span>;
      } else {
        return <div className="w-2 h-2 bg-white rounded-full" />;
      }
    } else if (status === 'active') {
      if (variant === 'numbers') {
        return <span className="text-white font-semibold">{stepNumber}</span>;
      } else {
        return <div className="w-2 h-2 bg-white rounded-full" />;
      }
    } else {
      // Pending
      if (variant === 'numbers') {
        return <span className="text-gray-500 font-semibold">{stepNumber}</span>;
      } else {
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />;
      }
    }
  };

  // Render connecting line
  const renderConnectingLine = (currentStep: Step, nextStep: Step | undefined) => {
    if (!nextStep) return null;

    const isCompleted = currentStep.status === 'completed';
    const lineColor = isCompleted ? 'bg-primary-500' : 'bg-gray-300';
    const lineStyle = isCompleted ? 'solid' : 'dashed';

    if (orientation === 'horizontal') {
      return (
        <div
          className={cn(
            'h-0.5 flex-1',
            lineColor,
            lineStyle === 'dashed' && 'border-dashed border-t-2 border-gray-300 bg-transparent'
          )}
        />
      );
    } else {
      return (
        <div
          className={cn(
            'w-0.5 flex-1',
            lineColor,
            lineStyle === 'dashed' && 'border-dashed border-l-2 border-gray-300 bg-transparent'
          )}
        />
      );
    }
  };

  // Render single step
  const renderStep = (step: Step, index: number) => {
    const { status, title, description } = step;
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isPending = status === 'pending';

    return (
      <div
        key={step.id}
        className={cn(
          'flex items-center',
          orientation === 'horizontal' ? 'flex-col' : 'flex-row',
          currentSize.spacing
        )}
      >
        {/* Step Circle */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full border-2 border-solid transition-colors duration-200',
            currentSize.circle,
            isCompleted && 'bg-primary-500 border-primary-500 text-white',
            isActive && 'bg-primary-500 border-primary-500 text-white',
            isPending && 'bg-white border-gray-300 text-gray-500'
          )}
        >
          {renderStepIcon(step, index)}
        </div>

        {/* Step Content */}
        <div
          className={cn(
            'flex flex-col',
            orientation === 'horizontal' ? 'text-center mt-spacing-xs' : 'ml-spacing-md'
          )}
        >
          <div
            className={cn(
              'font-semibold',
              currentSize.text,
              isCompleted && 'text-primary-500',
              isActive && 'text-primary-500',
              isPending && 'text-gray-500'
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={cn(
                currentSize.description,
                'text-gray-500 mt-spacing-xs'
              )}
            >
              {description}
            </div>
          )}
        </div>

        {/* Connecting Line */}
        {orientation === 'horizontal' && (
          <div className="flex items-center w-full mt-spacing-sm">
            {renderConnectingLine(step, steps[index + 1])}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {renderStep(step, index)}
          {orientation === 'vertical' && index < steps.length - 1 && (
            <div className="flex items-center ml-spacing-md">
              {renderConnectingLine(step, steps[index + 1])}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Convenience components for different variants
export function StepperWithCheckmarks(props: Omit<StepperProps, 'variant'>) {
  return <Stepper variant="checkmarks" {...props} />;
}

export function StepperWithDots(props: Omit<StepperProps, 'variant'>) {
  return <Stepper variant="dots" {...props} />;
}

export function StepperWithNumbers(props: Omit<StepperProps, 'variant'>) {
  return <Stepper variant="numbers" {...props} />;
}

// Orientation variants
export function HorizontalStepper(props: Omit<StepperProps, 'orientation'>) {
  return <Stepper orientation="horizontal" {...props} />;
}

export function VerticalStepper(props: Omit<StepperProps, 'orientation'>) {
  return <Stepper orientation="vertical" {...props} />;
}

// Size variants
export function StepperSmall(props: Omit<StepperProps, 'size'>) {
  return <Stepper size="sm" {...props} />;
}

export function StepperLarge(props: Omit<StepperProps, 'size'>) {
  return <Stepper size="lg" {...props} />;
}
