---
title: "About Arian Farid"
description: "Senior software developer and biologist with a PhD, writing about Rust, Golang, JavaScript, TypeScript, PHP, and complex systems."
layout: page
---

<div class="about">

<section class="about-hero">

# Arian Farid

Senior Software Developer · PhD

</section>

<section class="about-body">

I'm a senior software developer based in Tampa, FL.

Before my PhD I worked as a developer at the University of South Florida, building web mapping applications, serving GIS data, and shipping a hybrid mobile app for the National Park Service. I also worked with the USF Herbarium on a species catalog of the campus flora and fungi. I earned my PhD in Mycology from USF studying fungal systematics, kept programming throughout, and came back to software full-time after graduating.

These days I work as a full-stack engineer on B2B SaaS. Outside of that I spend most of my time writing Rust and Golang.

This blog is a mix of things: projects I find interesting, ideas worth writing out, and topics from software or biology I want to explain to a general audience. I also rock climb and run.

You can reach me on [LinkedIn](https://www.linkedin.com/in/arian-farid/) or find my code on [GitHub](https://github.com/arianfarid) and [Codeberg](https://codeberg.org/arianfarid).

</section>

<section class="subsection">

## Projects

### **[`sqlite-fastx`](https://github.com/arianfarid/sqlite-fastx)**

`sqlite-fastx` is a SQLite extension that enables querying FASTA/FASTQ genomic sequence files. 

Written in Rust, it uses virtual tables (via `sqlite3_ext`) to enable pushdown filtering, gzip decompression, indexed lookups, and a toolset for bioinformatics like `gc_content()`, `n50()`, and `reverse_complement()`.

</section>

<section class="subsection">

## Publications

1. **Neotropical *Clavulina*: Two new species from Mexico and a re-evaluation of *Clavulina floridana***
   Salas-Lizana R. et al. (incl. Farid A.) — *Mycologia*, 115(1), 2023.
   [doi:10.1080/00275514.2022.2148191](https://doi.org/10.1080/00275514.2022.2148191)

2. **Sharpening plant taxonomy in South Florida: Baccharis and Melanthera (Asteraceae), Borreria and Chiococca (Rubiaceae), and Lantana (Verbenaceae)**
   Franck A.R., Gann G.D., Sadle J., Farid A. — *Phytologia*, 103(2), 2021.
   [phytologia.org](https://www.phytologia.org/uploads/2/3/4/2/23422706/103_2_29-68francksouthflorida26apr2020.pdf)

3. **Expansion of the genus *Imleria* in North America to include *Imleria floridana*, sp. nov., and *Imleria pallida*, comb. nov.**
   Farid A., Franck A.R., Bolin J., Garey J.R. — *Mycologia*, 112(2), 2020.
   [doi:10.1080/00275514.2019.1685359](https://doi.org/10.1080/00275514.2019.1685359)

4. **Fungal Planet description sheets: 1042–1111**
   Crous P.W. et al. (incl. Farid A.) — *Persoonia*, 44, 2020.
   [ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC7567971/)

5. **Many species of the Carnivora consume grass and other fibrous plant tissues**
   Franck A.R., Farid A. — *Belgian Journal of Zoology*, 150, 2020.
   [belgianjournalofzoology.eu](https://belgianjournalofzoology.eu/BJZ/article/view/73)

6. **Validation of two fungal names in *Marasmius* Fr. (Marasmiaceae)**
   Guard F.E., Barrett M.D., Farid A. et al. — *Journal of Adelaide Botanic Gardens*, 33, 2019.
   [environment.sa.gov.au](https://data.environment.sa.gov.au/Content/Publications/JABG33P111_Guard.pdf)

7. **Boletus rubricitrinus belongs in Pulchroboletus (Boletaceae)**
   Farid A., Franck A.R., Garey J.R. — *Czech Mycology*, 69(2), 2017.
   [doi:10.33585/cmy.69204](https://doi.org/10.33585/cmy.69204)

</section>

</div>

<style scoped>
.about {
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.about-hero {
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 3rem;
}

.about-hero h1 {
  font-family: 'Lora', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
}

.about-hero p,
.about-hero :not(h1) {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
  letter-spacing: 0.02em;
}

.about-body {
  margin-bottom: 3rem;
  font-size: 1.05rem;
  line-height: 1.8;
}

.about-body p {
  margin-bottom: 1.25rem;
}

.about-body p:last-child {
  margin-bottom: 0;
}

.about-body a,
.subsection a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.about-body a:hover,
.subsection a:hover {
  text-decoration: underline;
}

.subsection {
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 3rem;
}

.subsection h3 {
  font-family: 'Lora', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.subsection p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin-bottom: 1.25rem;
}

.subsection p:last-child {
  margin-bottom: 0;
}

.subsection h2 {
  font-family: 'Lora', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.subsection ol {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.subsection li {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.subsection li a {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}
</style>
