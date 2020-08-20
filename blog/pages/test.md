---
title: Test
tags: "test"
date: "2012-01-02"
---

# Just a test page


```typescript
  getCurrent(): Observable<ScullyRoute> {
    if (!location) {
      /** probably not in a browser, no current location available */
      return of();
    }
    const curLocation = decodeURI(location.pathname).trim();
    return this.scully.available$.pipe(
      map(list =>
        list.find(
          r =>
            curLocation === r.route.trim() ||
            (r.slugs &&
              Array.isArray(r.slugs) &&
              r.slugs.find(slug => curLocation.endsWith(slug.trim())))
        )
      )
    );
  }
```