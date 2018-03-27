# Pointyfolio 
---
Pointyfolio is a Hugo theme based on [Material Design](https://getmdl.io/) and [Masonry](https://masonry.desandro.com/) and ideal for sites with lots of images to showcase.

## Theme Features 

### Page Bundles
This theme uses Hugo's [page bundles](https://gohugo.io/content-management/page-bundles/#readout) feature to organise image content. See the `exampleSite` for demo. Using non-image content (e.g. `.md`) is as yet untested.

### Hero Image 
The index page features a prominent hero image, which can be configured. If left blank, it defaults to a background color of `#424242`.

### Tag filters
Navigating to `http://example.com/tags/` shows a filterable list of tags used in posts. Checking the check box triggers the selection, while clicking on the tag name takes you to a text list of all posts with tag.

An `exampleSite` with a `config.toml` is included for reference.


```toml
[params]
  heroImage = "stock/mushroom.jpg"
```

## Configuration

A few more options can be configured as well:

```toml
[params]
  subtitle = "Adventures in Hugoland"
  copyright = "Copyright © 2018"
  author = "Pointy Far"
  heroImage = "stock/mushroom.jpg"
  errorImage = "stock/missing-mushroom.png"

  footerNotice = "Powered by Hugo. Themed by PointyFar"
  mainSections = ["post"]

  swapFontawesome = ""
  
```

`copyright`, `author` and `footerNotice` are used to populate the left side of the footer.


### Syntax Highlighting

```toml
  pygmentsUseClassic = false
  pygmentsCodeFences = true
  pygmentsCodeFencesGuessSyntax = true
  pygmentsUseClasses = true
```
Hugo comes with [Chroma](https://gohugo.io/content-management/syntax-highlighting/). Use the above configuration, or follow the Hugo documentation for instructions on deploying with Pygments instead. Generate the css styles into `static/chroma.css`

`hugo gen chromastyles  > static/chroma.css`

```toml
[params.highlight]
  enableHighlight = true
  highlightCSS = "<link href=\"/css/chroma.css\" rel=\"stylesheet\">"
```

To use `highlight.js` instead, set 
```toml
  pygmentsUseClassic = true 
  pygmentsUseClasses = false
```
and, if using CDN for example: 
```toml
[params.hightlight]
  highlightCSS = "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css\">"
  highlightJS = "<script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js\"></script>"
```

Set `enableHighlight = true` and point `highlightCSS` to the relevant css file. 

---

### Using Math 

Set `hasMath: true` in a post's front matter to enable MathJax on that post. 

```md
Let `\(t \in \Re^+)\`and find `$\mathbb{E}[S_t], \mathcal{V}[S_t]$`
```
The above will render as inline math, while the following will render as display math:

```md
$$
S_t = \int_0^t S(s) dW(s)
$$
```

---
### Using CDNs 

By default, the theme includes vendor CSS and JS files under `static/vendor`. If you would prefer to use CDNs instead, set `enableCDN = true` and list the CDN sources you would prefer to use. 

```toml
[params.cdn]
  enableCDN = true
  listCDN = [
    "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">",
    "<link rel=\"stylesheet\" href=\"https://code.getmdl.io/1.3.0/material.indigo-pink.min.css\">",
    "<script defer src=\"https://code.getmdl.io/1.3.0/material.min.js\"></script>",

    "<script src=\"https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js\"></script>"
  ]
```

Note that MathJax uses a CDN. Override `partials/mathjax` if you would prefer to host your own. Refer to [MathJax documentation](https://www.mathjax.org/#gettingstarted) for more details.

---

### Legals

```toml
[[params.legal]]
  legalurl = "#"
  legaltext = "Privacy Policy"

[[params.legal]]
  legalurl = "#"
  legaltext = "Terms of Use"
```

---


The theme iterates over `[[params.legal]]` to populate the legal links on the footer. 

### Socials

```toml
[[params.social]]
  url = "http://www.twitter.com"
  icon = "fab fa-twitter"
```

It also iterates over `[[params.social]]` to populate the social media buttons on the right side of the footer. Fontawesome is used by default, but may be replaced by your icon set of choice. Specify the url to use in `swapFontawesome`.

```toml
[params]
    swapFontawesome = "<link href=\"http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css\" rel=\"stylesheet\">"
```
    
