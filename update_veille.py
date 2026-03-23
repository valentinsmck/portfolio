import re

HTML_TEMPLATE = """
  <!-- Article {id} -->
  <a href="{link}" target="_blank" class="group flex flex-col md:flex-row gap-8 p-8 bg-surface-container-lowest rounded-lg border border-transparent hover:border-secondary-container/30 transition-all duration-300">
    <div class="w-24 h-24 flex-shrink-0 bg-surface-variant rounded-lg overflow-hidden flex items-center justify-center relative">
      <img alt="Illustration de l'article" src="https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&w=200&h=200&q=80" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      <div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
    </div>
    <div class="space-y-3 flex-grow">
      <div class="flex justify-between items-start">
        <h4 class="font-headline font-bold text-xl text-primary leading-snug group-hover:text-secondary transition-colors">
          {title}
        </h4>
        <span class="material-symbols-outlined text-on-surface-variant opacity-40 group-hover:opacity-100 transition-opacity" data-icon="open_in_new">open_in_new</span>
      </div>
      <p class="text-on-surface-variant leading-relaxed max-w-3xl text-sm">
        {desc}
      </p>
      <div class="pt-2 flex gap-4 text-[10px] font-label uppercase tracking-widest text-on-surface-variant/60">
        <span>{date}</span>
        <span>•</span>
        <span>{source_name}</span>
      </div>
    </div>
  </a>
"""

articles_data = [
    {
        "id": 1,
        "title": "L'IA va-t-elle remplacer les développeurs ?",
        "link": "https://talks.freelancerepublik.com/lia-va-t-elle-remplacer-les-developpeurs-ce-que-les-entreprises-doivent-savoir/",
        "img_id": "1677442136019-2178087790b5",
        "date": "Mars 2025",
        "source_name": "Freelance Republik",
        "desc": "Les outils d'IA générative comme GitHub Copilot excellent dans l'automatisation des tâches répétitives, la génération de code standard, la correction d'erreurs courantes et la détection de failles de sécurité. Mais ils restent limités sur la compréhension métier, la conception logicielle avancée et la prise de décision stratégique.<br><br>La demande pour les profils IA a augmenté de 40 % entre 2023 et 2025, et les entreprises qui combinent IA et supervision humaine réduisent de 30 % le taux d'erreur dans leurs applications.<br><br><strong>🎯 Ce qu'on en tire :</strong> Le développeur ne disparaît pas, mais son périmètre se recentre sur l'architecture, la vision métier et la supervision des outils IA. L'IA est un assistant, pas un remplaçant."
    },
    {
        "id": 2,
        "title": "État des lieux & marché du recrutement",
        "link": "https://automatisia.fr/lavenir-des-developpeurs-a-lere-de-lia-etat-des-lieux-et-perspectives/",
        "img_id": "1550751827-4bd374c3f58b",
        "date": "Avril 2025",
        "source_name": "AutomatisIA",
        "desc": "Le marché français du numérique en 2024 est dynamique mais difficile, avec un décalage croissant entre compétences demandées et disponibles. En 2025, le marché montre un ralentissement général, mais la demande pour l'expertise en IA et sécurité reste forte.<br><br>D'ici 2025, Gartner prévoyait que 75 % des entreprises passeraient des projets pilotes d'IA à des opérations à grande échelle. En 2024, environ 35 % des entreprises mondiales utilisaient déjà l'IA dans leurs opérations.<br><br><strong>🎯 Ce qu'on en tire :</strong> Le marché IT se restructure. Les juniors souffrent, les spécialistes IA et sécurité sont en forte demande. Anticipez la montée en compétences vers ces profils hybrides."
    },
    {
        "id": 3,
        "title": "Google Stitch : la fin du fossé design/développement",
        "link": "https://developers.googleblog.com/stitch-a-new-way-to-design-uis/",
        "img_id": "1561070791360-81bce4c06013",
        "date": "Mai 2025",
        "source_name": "Google Developers Blog",
        "desc": "Annoncé à Google I/O 2025, Stitch est un outil Google Labs permettant de transformer des prompts texte ou des images en designs UI et en code frontend fonctionnel en quelques minutes. Il exploite les capacités multimodales de Gemini 2.5 Pro pour créer un workflow plus fluide entre design et développement.<br><br>Une fois satisfait du design, Stitch propose des ponts essentiels vers le workflow de développement : export vers Figma pour raffinement collaboratif, et génération de code frontend propre et fonctionnel.<br><br><strong>🎯 Ce qu'on en tire :</strong> Stitch réduit la friction entre designers et développeurs frontend. Les développeurs doivent désormais maîtriser ces outils pour rester dans la boucle créative, ou risquent de se voir contourner sur les phases de prototypage."
    },
    {
        "id": 4,
        "title": "Vibe Coding : le nouveau paradigme",
        "link": "https://www.freelance-informatique.fr/actualites/vibe-coding",
        "img_id": "1518770660439-4636190af475",
        "date": "Juin 2025",
        "source_name": "Freelance Informatique",
        "desc": "Le terme \"vibe coding\" a été popularisé en février 2025 par Andrej Karpathy (cofondateur d'OpenAI). Le marché mondial des plateformes de vibe coding était estimé à 4,7 milliards de dollars en 2025. Selon des statistiques relayées par Second Talent, 41 % du code informatique mondial est désormais généré ou suggéré par des assistants IA.<br><br>Une étude de CodeRabbit en 2025 démontre que le code co-écrit par IA contient 2,74 fois plus de problèmes de sécurité qu'un code humain. Karpathy lui-même défend l'évolution du \"vibe coding\" pur vers l'\"Agentic Engineering\" : le développeur orchestre un processus complet de génération, de tests et de validation.<br><br><strong>🎯 Ce qu'on en tire :</strong> Le vibe coding est une réalité mais comporte des risques sérieux (sécurité, maintenabilité). La posture d'orchestrateur/validateur devient la compétence clé du développeur moderne."
    },
    {
        "id": 5,
        "title": "Mutation du métier et enjeux emploi",
        "link": "https://www.lbke.fr/actus/2025/developpeur-web-ia-crise-ou-mutation",
        "img_id": "1551288049-bebda4e38f71",
        "date": "Juillet 2025",
        "source_name": "LBKE.fr",
        "desc": "L'APEC enregistre une baisse de 18 % des recrutements de cadres en 2024 dans les activités informatiques, et les recrutements de cadres ayant moins d'un an d'expérience ont chuté de 19 %. L'OIT classe les développeurs dans les catégories à exposition très élevée à l'IA générative, avec une faible variabilité des tâches.<br><br>48 % des entreprises travaillent sur l'adoption de l'IA générative (contre 29 % fin 2023), mais 47 % citent le manque de compétences internes comme obstacle principal. Une nouvelle figure émerge : le développeur \"augmenté\", à l'aise avec les outils d'IA, capable d'en tirer parti pour rester productif et compétitif.<br><br><strong>🎯 Ce qu'on en tire :</strong> La compression du marché junior est réelle et documentée. La valeur se déplace vers les profils hybrides techniques + IA. C'est un signal fort pour adapter sa formation continue."
    },
    {
        "id": 6,
        "title": "Vibe Coding : la controverse",
        "link": "https://programmation.developpez.com/actu/374842/",
        "img_id": "1526374965328-7f61d4dc18c5",
        "date": "Août 2025",
        "source_name": "Developpez.com",
        "desc": "Google déclare générer 25 % de son code par IA. L'expert David Farley critique le vibe coding comme une mauvaise idée en 2025, estimant que les LLMs ne sont pas prêts pour la création de logiciels fiables, sécurisés et évolutifs. Il souligne le risque de perte de compétences fondamentales chez les développeurs qui acceptent du code sans le comprendre.<br><br><strong>🎯 Ce qu'on en tire :</strong> Un contre-point nécessaire. La communauté senior est divisée. L'article pousse à une utilisation responsable, avec validation systématique et maintien des bases techniques solides."
    },
    {
        "id": 7,
        "title": "Les vrais gains de productivité sous la loupe",
        "link": "https://www.lemagit.fr/actualites/366627990/",
        "img_id": "1498050108023-c5249f4df085",
        "date": "Septembre 2025",
        "source_name": "LeMagIT / Atlassian",
        "desc": "Selon l'étude State of DevEx 2025 d'Atlassian (3 500 développeurs interrogés), 68 % rapportent un gain de plus de 10 heures par semaine grâce à l'IA générative. Mais 50 % de ces développeurs déclarent perdre ces heures à cause de frictions organisationnelles : documentation, changement de contexte, dette technique.<br><br>L'institut METR a conduit une étude randomisée sur 16 développeurs open source : les développeurs prévoyaient que l'IA réduirait leur temps de 24 %, mais en réalité l'IA a augmenté le temps d'exécution de 19 % — surtout sur de grandes bases de code dépassant un million de lignes.<br><br><strong>🎯 Ce qu'on en tire :</strong> L'IA ne fait pas de miracles si l'environnement organisationnel est défaillant. Les gains réels dépendent autant de la qualité des processus que des outils. Article clé pour cadrer des attentes réalistes."
    },
    {
        "id": 8,
        "title": "Google Antigravity : l'IDE agent-first",
        "link": "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/",
        "img_id": "1620712943543-bcc4688e7485",
        "date": "Novembre 2025",
        "source_name": "Google Developers Blog",
        "desc": "Lancé le 20 novembre 2025, Google Antigravity est une plateforme de développement agentique combinant un IDE classique AI-powered avec une interface \"agent-first\". Elle permet de déployer des agents qui planifient, exécutent et vérifient de manière autonome des tâches complexes à travers l'éditeur, le terminal et le navigateur.<br><br>La plateforme est disponible gratuitement en public preview. Les agents génèrent des \"Artifacts\" — listes de tâches, plans d'implémentation, captures d'écran — sur lesquels le développeur peut laisser des commentaires pour guider l'agent sans interrompre son flux d'exécution.<br><br><strong>🎯 Ce qu'on en tire :</strong> Antigravity incarne le concept \"donner un environnement complet à l'IA\" (accès éditeur + terminal + navigateur). C'est l'évolution la plus radicale : l'IA ne complète plus le code, elle orchestre des fonctionnalités entières. Le développeur devient un chef de projet d'agents."
    },
    {
        "id": 9,
        "title": "Comparatif des outils : Cursor, Windsurf, Claude Code",
        "link": "https://www.digitalapplied.com/blog/ai-coding-tools-comparison-december-2025",
        "img_id": "1525547719571-a2d4ac8945e2",
        "date": "Décembre 2025",
        "source_name": "Digital Applied",
        "desc": "Le \"vibe coding\" a été élu mot de l'année 2025 par le dictionnaire Collins. 25 % des startups Y Combinator Winter 2025 ont déclaré avoir des bases de code générées à 95 % par IA. Le marché des outils de coding IA atteindrait 12,3 milliards de dollars d'ici 2027.<br><br>Cursor mène le développement agent-first avec son mode Composer multi-fichiers. Windsurf (anciennement Codeium) offre le meilleur rapport qualité/prix à 15 $/mois. GitHub Copilot reste le standard enterprise. Claude Code excelle sur les refactorings complexes avec son score SWE-bench de 80,9 % et sa fenêtre de contexte de 200 000 tokens.<br><br><strong>🎯 Ce qu'on en tire :</strong> Pas de \"meilleur outil\" universel. La stratégie gagnante est la combinaison : un IDE agent (Cursor/Windsurf) pour le quotidien, un outil terminal (Claude Code) pour les tâches complexes, Copilot pour l'intégration enterprise."
    },
    {
        "id": 10,
        "title": "Antigravity vs l'écosystème Google (retour d'expérience)",
        "link": "https://seroter.com/2025/11/30/go-from-prompt-to-production-using-a-set-of-ai-tools-or-just-one-google-antigravity/",
        "img_id": "1607799279861-4dd42183d166",
        "date": "Janvier 2026",
        "source_name": "Richard Seroter's Musings",
        "desc": "Antigravity n'est pas un simple éditeur de code. Contrairement aux IDE classiques, il est agent-first et supporte un riche ensemble de surfaces dans une seule expérience : lancement d'agents, Computer Use dans un navigateur dédié, et extensions via des serveurs MCP.<br><br>L'agent maintient une liste de tâches en temps réel, crée les fichiers du projet et exécute des commandes shell. L'\"Agent Manager\" permet de visualiser l'inbox des tâches et de monitorer plusieurs agents en parallèle.<br><br><strong>🎯 Ce qu'on en tire :</strong> Antigravity concrétise le passage du \"coder\" à \"orchestrer\". Un développeur peut désormais gérer 5 agents en parallèle sur 5 problèmes différents. La productivité n'est plus linéaire, elle devient multiplicative."
    },
    {
        "id": 11,
        "title": "Impact sur les juniors et la formation",
        "link": "https://www.journaldunet.com/solutions/dsi/1548375-comment-former-un-developpeur-junior-a-l-ere-de-l-ia-generative/",
        "img_id": "1543286386242-13758b9759ce",
        "date": "Février 2026",
        "source_name": "Journal du Net",
        "desc": "Une étude de Stanford montre que le recrutement des codeurs débutants (22-25 ans) a reculé de près de 20 % entre fin 2022 et juillet 2025. Sur la même période, l'embauche de profils seniors augmentait dans une proportion similaire : les employeurs forment des tandems IA + senior plutôt que de recruter des juniors.<br><br>Les promotions actuelles de diplômés sont les premières formées à coder nativement avec Claude Code, GitHub Copilot, Cursor ou Lovable. Des juniors témoignent : \"Plus je m'appuie sur l'IA, moins je pose les bonnes questions\" et \"je ne mémorise pas ce que l'IA produit.\"<br><br><strong>🎯 Ce qu'on en tire :</strong> Article crucial pour comprendre la fracture entre juniors et seniors. Les fondamentaux techniques restent indispensables pour valider ce que l'IA produit. La formation doit combiner Software Craftsmanship classique ET compétences IA."
    },
    {
        "id": 12,
        "title": "Google Stitch évolue : \"Vibe Design\" et intégration Antigravity",
        "link": "https://aibusiness.com/generative-ai/google-s-stitch-and-ai-driven-development",
        "img_id": "1555949963-ff9fe0c870eb",
        "date": "Mars 2026",
        "source_name": "AI Business",
        "desc": "Le 18 mars 2026, Google a revu en profondeur Stitch avec le \"Vibe Design\" : un canvas natif IA permettant de combiner prompts texte, images et code pour générer des designs UI haute fidélité. Un agent de design accompagne l'ensemble du processus, de l'idéation au prototype interactif.<br><br>Stitch peut désormais s'intégrer avec Antigravity via un serveur MCP, garantissant une continuité seamless entre le design et le développement. L'outil propose aussi un fichier DESIGN.md pour exporter et importer des règles de design entre projets.<br><br><strong>🎯 Ce qu'on en tire :</strong> L'écosystème Google (Stitch → Antigravity → Jules) forme une chaîne complète de l'idée au déploiement, orchestrée par des agents. C'est l'incarnation la plus avancée du concept \"AI as a co-worker\" pour les équipes produit/dev."
    }
]

html_output = '<div class="grid gap-8">\n'

for article in articles_data:
    html_output += HTML_TEMPLATE.format(**article)

html_output += "</div>"

file_path = "c:/Users/Valen/Documents/GitHub/portfolio/Veille.html"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace everything from <div class="grid gap-8"> up to its matching closing </div>
# In the current file, it starts at <div class="grid gap-8"> and ends just before </section> </div>
start_idx = text.find('<div class="grid gap-8">')
end_idx = text.find('</section>', start_idx)

new_text = text[:start_idx] + html_output + "\n" + text[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_text)

print("Updated Veille.html successfully!")
