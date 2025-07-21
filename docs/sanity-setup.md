# Sanity CMS Setup for Urban Sketchers Oslo

## Quick Setup Guide

### 1. Create Sanity Project

```bash
npm create sanity@latest -- --template clean --create-project "Urban Sketchers Oslo" --dataset production
```

### 2. Install Sanity Studio

```bash
cd sanity-studio # (or your chosen directory)
npm run dev
```

### 3. Event Schema

Create this schema in your Sanity studio (`schemas/event.js`):

```javascript
export default {
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "time",
      title: "Start Time",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "maxAttendees",
      title: "Maximum Attendees",
      type: "number",
    },
    {
      name: "skillLevel",
      title: "Skill Level",
      type: "string",
      options: {
        list: [
          { title: "All Levels", value: "all" },
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "image",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      location: "location",
      media: "image",
    },
    prepare(selection) {
      const { title, date, location } = selection;
      return {
        title: title,
        subtitle: `${new Date(date).toLocaleDateString()} - ${location}`,
      };
    },
  },
};
```

### 4. Registration Schema (Optional)

For tracking attendees (`schemas/registration.js`):

```javascript
export default {
  name: "registration",
  title: "Event Registrations",
  type: "document",
  fields: [
    {
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "attendeeName",
      title: "Attendee Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "registrationDate",
      title: "Registration Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
  ],
};
```

### 5. Environment Variables

Create `.env.local` with your Sanity credentials:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your-token
```

## Benefits of This Setup

✅ **Non-technical Content Management** - Team members can easily add/edit events
✅ **Real-time Updates** - Events automatically appear on the website
✅ **Rich Content** - Support for images, descriptions, and metadata
✅ **Attendee Tracking** - Optional registration system
✅ **SEO Friendly** - Structured data for search engines
✅ **Scalable** - Can handle hundreds of events
✅ **Free Tier** - Sanity offers generous free usage

## Alternative CMS Options

### Option 2: Strapi (Self-hosted)

- Free and open source
- Full control over data
- Requires server hosting

### Option 3: Contentful

- Generous free tier
- Excellent developer experience
- Built-in CDN for images

### Option 4: Airtable as CMS

- Familiar spreadsheet interface
- Great for non-technical users
- API integration available

## Next Steps

1. Choose your CMS provider
2. Set up the event schema
3. Add your API credentials to `.env.local`
4. Start adding events through the CMS interface!

The website will automatically fetch and display events from your CMS.
