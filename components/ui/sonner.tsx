'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'
import { X } from 'lucide-react' // or your icon library

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="top-center"
      duration={4000} // auto-dismiss after 4s
      closeButton={true}
      richColors // enables nicer accent colors
      className="toaster group top-4 sm:top-6 md:top-8"
      toastOptions={{
        classNames: {
          toast:
            'group toast !bg-popover !text-popover-foreground !border-border !shadow-lg min-w-[320px]',
          title: '!font-semibold',
          description: '!text-muted-foreground !text-sm',
          actionButton:
            '!bg-primary !text-primary-foreground hover:!bg-primary/90',
          cancelButton: '!bg-muted !text-muted-foreground hover:!bg-muted/80',
          closeButton:
            'absolute right-2 top-2 rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity !bg-muted/50 !text-foreground',
          // Force background for all variants
          default: '!bg-popover',
          success: '!bg-success !text-success-foreground',
          error: '!bg-destructive !text-destructive-foreground',
          warning: '!bg-yellow-500/20 !text-yellow-900 dark:!bg-yellow-900/30 dark:!text-yellow-100',
          info: '!bg-blue-500/10 !text-blue-900 dark:!bg-blue-900/30 dark:!text-blue-100',
        },
      }}
      icons={{
        close: <X className="h-4 w-4" />,
      }}
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--success-bg': 'hsl(var(--success))',
        '--success-text': 'hsl(var(--success-foreground))',
        '--success-border': 'hsl(var(--success)/0.5)',
        '--error-bg': 'hsl(var(--destructive))',
        '--error-text': 'hsl(var(--destructive-foreground))',
        '--error-border': 'hsl(var(--destructive)/0.5)',
        // Add more if you use warning/info variants
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }