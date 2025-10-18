import { Display, Text, Heading, Subheading, Body, Caption, Label } from '../components/Typography';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Typography Showcase */}
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

        {/* Convenience Components */}
        <div className="space-y-4">
          <Subheading>Convenience Components</Subheading>
          <div className="space-y-2">
            <Heading>This is a Heading</Heading>
            <Subheading>This is a Subheading</Subheading>
            <Body>This is body text for regular content.</Body>
            <Label>This is a label</Label>
            <Caption>This is a caption for additional information</Caption>
          </div>
        </div>
      </div>
    </div>
  );
}
