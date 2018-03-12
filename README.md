# Pointyfolio 
---
Pointyfolio is a Hugo theme based on [Material Design](https://getmdl.io/) and [Masonry](https://masonry.desandro.com/) and ideal for sites with lots of images to showcase.

The index page features a prominent image, which can be configured. If left blank, it defaults to a background color of `#424242`.

```toml
[params]
  homeImage = "stock/mushroom.jpg"
```

## Configuration

A few more options can be configured as well:

```toml
[params]
  subtitle = "Adventures in Hugoland"
  copyright = "Copyright © 2018"
  author = "Pointy Far"
  homeImage = "stock/mushroom.jpg"
  postsToShow = 10
  footerNotice = "Powered by Hugo. Themed by PointyFar"
  swapFontawesome = ""
  
```

`copyright`, `author` and `footerNotice` are used to populate the left side of the footer.

`postsToShow` controls the number of posts displayed on the front page.

### Syntax Highlighting

```toml
[params]
  pygmentsUseClassic = false
  pygmentsCodeFences = true
  pygmentsCodeFencesGuessSyntax = true
  pygmentsUseClasses = true
```
Hugo comes with [Chroma](https://gohugo.io/content-management/syntax-highlighting/). Use the above configuration, or follow the Hugo documentation for instructions on deploying with Pygments instead. Generate the css styles into `static/chroma.css`

`hugo gen chromastyles  > static/chroma.css`

### Legals

```toml
[[params.legal]]
  legalurl = "#"
  legaltext = "Privacy Policy"

[[params.legal]]
  legalurl = "#"
  legaltext = "Terms of Use"

```

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
    
