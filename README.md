```
                        ___                                           
         _   _        (  _`\                      _                  
        ( \_/ )       | (_(_)   __   _ __  _   _ (_)   ___    __     
       __) _ (__      `\__ \  /'__`\( '__)( ) ( )| | /'___) /'__`\                   _   _
      (__ (_) __)     ( )_) |(  ___/| |   | \_/ || |( (___ (  ___/                  ( \_/ )
         ) _ (        `\____)`\____)(_)   `\___/'(_)`\____)`\____)     _   _       __) _ (__
        (_/ \_)                                                _   _  ( \_/ )  _  (__ (_) __)         
      _   _   _               _                               ( \_/ )__) _ (__( \_/ )) _ (      
     ( ) ( ) ( )   _    _ __ ( )/')    __   _ __   ___       __) _ ((__ (_) __)) _ ((_/ \_)       
     | | | | | | /'_`\ ( '__)| , <   /'__`\( '__)/',__)     (__ (_) __)) _ ((__ (_) __)        
     | (_/ \_) |( (_) )| |   | |\`\ (  ___/| |   \__, \        ) _ (  (_/ \_)  ) _ (           
     `\___x___/'`\___/'(_)   (_) (_)`\____)(_)   (____/       (_/ \_)         (_/ \_)           

```

> A simple implementation of off-line content cache based on service workers,

### [Demo](https://websemantics.github.io/service-workers/)&nbsp;&nbsp;&nbsp;[Getting Started](#getting-started)&nbsp;&nbsp;&nbsp;[Submit Issue](https://github.com/websemantics/service-workers/issues)


## Getting Started

A great introduction to *Service Workers* can be found in the [References](#references) sections.

There are three events that need to be handled,

- Install,
- Activate, and
- Fetch.

The *install* event is fired once, *activate* after *instal* and every time a pgage from the registered domain is loaded (but not between pages from the same domain), and *fetch*, every time a page is requested.

                            **WORK IN PROGRESS**


## References

[Article](https://madebymike.com.au//writing/service-workers/?utm_source=codropscollective), Offline content with service workers.

[The Service Worker](https://jakearchibald.com/2014/offline-cookbook/), The offline cookbook.
