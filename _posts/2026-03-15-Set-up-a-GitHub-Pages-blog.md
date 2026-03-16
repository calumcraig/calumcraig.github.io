---
layout: post
title: "How to Set Up a Blog on GitHub Pages Using Jekyll"
date: 2026-03-15
---

# How to Set Up a Blog on GitHub Pages Using Jekyll

It's been a wee while since I published a post and this is just a quick one but I thought it might be quite interesting to share my experience getting this blog up and running. It's kind of meta, a blog post about creating a blog but stick with me!

## Step 1: Create a GitHub Repository

1. Log in to GitHub.
2. Create a new repository named:
   - username.github.io (replace username with your GitHub username).
3. Set it to Public and initialise with a README.

---

## Step 2: Enable GitHub Pages

1. Go to Settings → Pages.
2. Under Source, select:
   - Branch: main
   - Folder: / (root)
3. Save. Your site will be live at:
   - https://username.github.io

---

## Step 3: Choose a Static Site Generator (Jekyll)

The easiest option is Jekyll (officially supported by GitHub Pages):

### Install Ruby and Jekyll locally:

```bash
sudo apt install ruby-full build-essential zlib1g-dev
gem install jekyll bundler
```

### Create a new Jekyll site:

```bash
jekyll new myblog
cd myblog
bundle exec jekyll serve
```

### Push the site to your GitHub repo:

```bash
git init
git remote add origin https://github.com/username/username.github.io.git
git add .
git commit -m "Initial blog setup"
git push -u origin main
```

---

## Step 4: Create content:

- Edit \_config.yml to set: 
  - Title, description, theme.
- Add posts in \_posts folder: 
  - Format: YYYY-MM-DD-title.md
  - Use Markdown for formatting.
This is ideal for me as I can edit documents directly in my Nextcloud instance then copy over to the blog project repo.
