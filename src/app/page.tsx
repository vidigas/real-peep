import { Display, Text, Heading, Subheading, Body, Caption, Label } from '../components/Typography';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Typography System */}
      <div className="space-y-6">
        <Heading>Typography System</Heading>
        
        {/* Display Sizes */}
        <div className="space-y-4">
          <Subheading>Display Sizes</Subheading>
          <div className="space-y-2">
            <Display size="2xl" weight="bold">Display 2xl Bold</Display>
            <Display size="xl" weight="medium">Display xl Medium</Display>
            <Display size="lg" weight="normal">Display lg Regular</Display>
            <Display size="md" weight="semibold">Display md Semibold</Display>
            <Display size="sm" weight="bold">Display sm Bold</Display>
            <Display size="xs" weight="medium">Display xs Medium</Display>
          </div>
        </div>

        {/* Text Sizes */}
        <div className="space-y-4">
          <Subheading>Text Sizes</Subheading>
          <div className="space-y-2">
            <Text size="xl" weight="semibold">Text xl Semibold</Text>
            <Text size="lg" weight="medium">Text lg Medium</Text>
            <Text size="md" weight="normal">Text md Regular</Text>
            <Text size="sm" weight="normal">Text sm Regular</Text>
            <Text size="xs" weight="medium">Text xs Medium</Text>
          </div>
        </div>

        {/* Typography Colors */}
        <div className="space-y-4">
          <Subheading>Typography Colors</Subheading>
          <div className="space-y-2">
            <Text size="lg" color="heading">Heading Text (Gray 900)</Text>
            <Text size="md" color="body">Body Text (Gray 800)</Text>
            <Text size="md" color="muted">Muted Text (Gray 400)</Text>
            <Text size="md" color="placeholder">Placeholder Text (Gray 300)</Text>
            <Text size="md" color="disabled">Disabled Text (Gray 300)</Text>
          </div>
        </div>
      </div>

      {/* Radius System */}
      <div className="space-y-6">
        <Heading>Radius System</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'none', value: 'rounded-none', desc: '0px' },
            { name: 'xxs', value: 'rounded-xxs', desc: '2px' },
            { name: 'xs', value: 'rounded-xs', desc: '4px' },
            { name: 'sm', value: 'rounded-sm', desc: '6px' },
            { name: 'md', value: 'rounded-md', desc: '8px' },
            { name: 'lg', value: 'rounded-lg', desc: '10px' },
            { name: 'xl', value: 'rounded-xl', desc: '12px' },
            { name: '2xl', value: 'rounded-2xl', desc: '16px' },
            { name: '3xl', value: 'rounded-3xl', desc: '20px' },
            { name: '4xl', value: 'rounded-4xl', desc: '24px' },
            { name: 'full', value: 'rounded-full', desc: '9999px' },
          ].map((radius) => (
            <div key={radius.name} className="text-center space-y-2">
              <div className={`w-16 h-16 bg-primary-500 ${radius.value} mx-auto`}></div>
              <div>
                <Text size="sm" weight="medium">{radius.name}</Text>
                <Caption>{radius.desc}</Caption>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing System */}
      <div className="space-y-6">
        <Heading>Spacing Primitives</Heading>
        <div className="space-y-4">
          {[
            { name: '0', value: 'w-0', desc: '0px' },
            { name: '0.5', value: 'w-0.5', desc: '2px' },
            { name: '1', value: 'w-1', desc: '4px' },
            { name: '2', value: 'w-2', desc: '8px' },
            { name: '3', value: 'w-3', desc: '12px' },
            { name: '4', value: 'w-4', desc: '16px' },
            { name: '6', value: 'w-6', desc: '24px' },
            { name: '8', value: 'w-8', desc: '32px' },
            { name: '12', value: 'w-12', desc: '48px' },
            { name: '16', value: 'w-16', desc: '64px' },
            { name: '24', value: 'w-24', desc: '96px' },
            { name: '32', value: 'w-32', desc: '128px' },
          ].map((space) => (
            <div key={space.name} className="flex items-center space-x-4">
              <div className="w-12">
                <Text size="sm" weight="medium">{space.name}</Text>
              </div>
              <div className={`h-4 bg-primary-500 ${space.value}`}></div>
              <div className="w-16">
                <Caption>{space.desc}</Caption>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layouts */}
      <div className="space-y-6">
        <Heading>Grid Layouts</Heading>
        <div className="space-y-4">
          <div className="space-y-2">
            <Subheading>Desktop Layout (1280px)</Subheading>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="max-w-desktop mx-auto bg-white p-8 rounded-md">
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-8 bg-primary-500 rounded-sm"></div>
                  ))}
                </div>
                <Caption className="mt-4">12 columns × 32px = 1216px content width</Caption>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Subheading>Tablet Layout (768px)</Subheading>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="max-w-tablet mx-auto bg-white p-6 rounded-md">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-6 bg-secondary-500 rounded-sm"></div>
                  ))}
                </div>
                <Caption className="mt-4">6 columns × 32px = 704px content width</Caption>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color System */}
      <div className="space-y-6">
        <Heading>Color System</Heading>
        <div className="space-y-4">
          <div className="space-y-2">
            <Subheading>Primary Colors</Subheading>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-primary-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-primary-600 rounded-lg"></div>
              <div className="w-16 h-16 bg-primary-700 rounded-lg"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Subheading>Secondary Colors</Subheading>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-secondary-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-secondary-600 rounded-lg"></div>
              <div className="w-16 h-16 bg-secondary-700 rounded-lg"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Subheading>Accent Colors</Subheading>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-accent-500 rounded-lg"></div>
              <div className="w-16 h-16 bg-accent-600 rounded-lg"></div>
              <div className="w-16 h-16 bg-accent-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
