        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animated counter for statistics
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 200;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 10);
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger counter animation for stats section
                    if (entry.target.closest('#stats')) {
                        setTimeout(animateCounters, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .stat-card').forEach(el => {
            observer.observe(el);
        });

        // Interactive map hotspot functionality
        function showHotspotInfo(title, description) {
            alert(`${title}\n\n${description}`);
        }

        // Species modal functionality
        const speciesData = {
            whale: {
                title: "North Atlantic Right Whale",
                status: "Critically Endangered",
                population: "~340 individuals",
                threats: [
                    "Ship strikes - Leading cause of mortality",
                    "Fishing gear entanglement - Causes injury and death",
                    "Climate change - Altering food sources and habitat",
                    "Ocean noise pollution - Disrupts communication and feeding"
                ],
                conservation: [
                    "NOAA has implemented ship speed restrictions in critical habitats",
                    "Development of ropeless fishing gear to reduce entanglement risk",
                    "Real-time monitoring systems to track whale movements",
                    "International cooperation for protection in Canadian waters"
                ],
                facts: [
                    "Can live up to 70 years",
                    "Females give birth every 3-6 years",
                    "Can weigh up to 70 tons",
                    "Feed primarily on tiny copepods"
                ]
            },
            turtle: {
                title: "Hawksbill Sea Turtle",
                status: "Critically Endangered",
                population: "~25,000 nesting females worldwide",
                threats: [
                    "Illegal trade - Shell used for jewelry and decorative items",
                    "Coastal development - Loss of nesting beaches",
                    "Plastic pollution - Mistaken for food, causes internal injuries",
                    "Climate change - Rising temperatures affect nest success"
                ],
                conservation: [
                    "CITES protection prohibits international trade",
                    "Marine protected areas established in key habitats",
                    "Nest monitoring and protection programs",
                    "Community-based conservation initiatives"
                ],
                facts: [
                    "Can live 50+ years",
                    "Travel thousands of miles between feeding and nesting areas",
                    "Play crucial role in coral reef health",
                    "Temperature determines the sex of hatchlings"
                ]
            },
            shark: {
                title: "Great White Shark",
                status: "Vulnerable",
                population: "Unknown, estimated significant decline",
                threats: [
                    "Overfishing - Targeted and incidental catch",
                    "Bycatch in commercial fisheries",
                    "Habitat degradation - Coastal development",
                    "Climate change - Affecting prey distribution"
                ],
                conservation: [
                    "Protected in many countries including US, Australia, South Africa",
                    "Marine protected areas in critical habitats",
                    "Shark finning bans in multiple jurisdictions",
                    "Research and tagging programs to understand behavior"
                ],
                facts: [
                    "Can live 70+ years",
                    "Apex predator crucial for ocean ecosystem balance",
                    "Can detect electrical fields from other animals",
                    "Migrate thousands of miles annually"
                ]
            }
        };

        function openSpeciesModal(species) {
            const modal = document.getElementById('speciesModal');
            const modalContent = document.getElementById('modalContent');
            const data = speciesData[species];

            modalContent.innerHTML = `
                <h2>${data.title}</h2>
                <div style="margin: 1rem 0;">
                    <span class="species-status ${data.status.toLowerCase().replace(' ', '')}" style="display: inline-block; margin-bottom: 1rem;">${data.status}</span>
                </div>
                <p><strong>Population:</strong> ${data.population}</p>
                
                <h3 style="margin-top: 2rem; color: #1e3c72;">Major Threats</h3>
                <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                    ${data.threats.map(threat => `<li style="margin-bottom: 0.5rem;">${threat}</li>`).join('')}
                </ul>
                
                <h3 style="margin-top: 2rem; color: #1e3c72;">Conservation Efforts</h3>
                <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                    ${data.conservation.map(effort => `<li style="margin-bottom: 0.5rem;">${effort}</li>`).join('')}
                </ul>
                
                <h3 style="margin-top: 2rem; color: #1e3c72;">Interesting Facts</h3>
                <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                    ${data.facts.map(fact => `<li style="margin-bottom: 0.5rem;">${fact}</li>`).join('')}
                </ul>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="cta-button" onclick="closeModal()" style="padding: 0.8rem 2rem;">Learn How to Help</button>
                </div>
            `;

            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('speciesModal').style.display = 'none';
        }

        // Close modal when clicking outside or on close button
        window.onclick = function(event) {
            const modal = document.getElementById('speciesModal');
            const closeBtn = document.querySelector('.close');
            
            if (event.target === modal || event.target === closeBtn) {
                closeModal();
            }
        }

        // Enhanced hotspot functionality with tooltip
        const tooltip = document.getElementById('tooltip');
        const hotspots = document.querySelectorAll('.hotspot');

        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseenter', function(e) {
                let title, description;
                
                if (this.classList.contains('hotspot-1')) {
                    title = 'Great Pacific Garbage Patch';
                    description = 'Largest accumulation of ocean plastic debris - twice the size of Texas';
                } else if (this.classList.contains('hotspot-2')) {
                    title = 'Coral Triangle';
                    description = '75% of coral species at risk from warming waters and bleaching events';
                } else if (this.classList.contains('hotspot-3')) {
                    title = 'Gulf Dead Zone';
                    description = 'Oxygen-depleted area from agricultural runoff affecting marine life';
                } else if (this.classList.contains('hotspot-4')) {
                    title = 'Arctic Ocean';
                    description = 'Rapid ice loss affecting polar bear and seal habitats';
                }
                
                tooltip.innerHTML = `<strong>${title}</strong><br>${description}`;
                tooltip.style.opacity = '1';
            });

            hotspot.addEventListener('mousemove', function(e) {
                const rect = e.target.closest('.map-container').getBoundingClientRect();
                tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
                tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
            });

            hotspot.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
            });
        });

        // Navbar scroll effect
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Interactive elements for better engagement
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                alert(`${title}\n\n${description}\n\nWould you like to learn specific steps you can take for this action? Visit our detailed guides section for more information.`);
            });
        });

        // Organization cards interaction
        document.querySelectorAll('.org-card').forEach(card => {
            const button = card.querySelector('.cta-button');
            const orgName = card.querySelector('h3').textContent;
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`Redirecting to ${orgName}'s official website...\n\nNote: This is a demo. In a real implementation, this would link to the actual organization's website.`);
            });
        });

        // Ocean layer tabs functionality
        function showLayer(layerId) {
            // Hide all layer contents
            document.querySelectorAll('.layer-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected layer content
            document.getElementById(layerId).classList.add('active');
            
            // Update active tab
            document.querySelectorAll('.layer-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            event.target.classList.add('active');
        }

        // Ocean facts slider
        let currentFact = 0;
        const facts = document.querySelectorAll('.fact-slide');
        
        function rotateFacts() {
            facts.forEach(fact => fact.classList.remove('active'));
            facts[currentFact].classList.add('active');
            
            currentFact = (currentFact + 1) % facts.length;
        }
        
        setInterval(rotateFacts, 5000);

        // Ocean quiz functionality
        const quizQuestions = [
            {
                question: "What percentage of Earth's surface is covered by oceans?",
                options: ["50%", "61%", "71%", "80%"],
                correct: 2
            },
            {
                question: "Which of these is the world's largest ocean?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correct: 3
            },
            {
                question: "Approximately how much of all life on Earth is found in the ocean?",
                options: ["50%", "70%", "80%", "94%"],
                correct: 3
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        function loadQuestion() {
            const question = quizQuestions[currentQuestion];
            document.getElementById('current-question').textContent = question.question;
            
            const options = document.querySelectorAll('.quiz-option');
            options.forEach((option, index) => {
                option.textContent = question.options[index];
            });
            
            document.getElementById('quiz-result').style.display = 'none';
        }
        
        function checkAnswer(selected) {
            const result = document.getElementById('quiz-result');
            const correct = quizQuestions[currentQuestion].correct;
            
            if (selected === correct) {
                result.textContent = "Correct! Well done.";
                result.style.color = "green";
                score++;
            } else {
                result.textContent = `Incorrect. The right answer is: ${quizQuestions[currentQuestion].options[correct]}`;
                result.style.color = "red";
            }
            
            result.style.display = 'block';
        }
        
        function nextQuestion() {
            currentQuestion = (currentQuestion + 1) % quizQuestions.length;
            loadQuestion();
            
            if (currentQuestion === 0) {
                alert(`Quiz completed! Your score: ${score}/${quizQuestions.length}`);
                score = 0;
            }
        }
        
        // Initialize the quiz
        loadQuestion();

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter! You\'ll receive updates on ocean conservation soon.');
            this.reset();
        });

        console.log('Ocean Guardian website loaded successfully! 🌊');
        console.log('Features loaded:');
        console.log('- Responsive navigation with mobile menu');
        console.log('- Interactive statistics with animations');
        console.log('- Species information modals');
        console.log('- Interactive threat map');
        console.log('- Ocean zones information');
        console.log('- Ocean quiz');
        console.log('- Smooth scrolling and modern animations');
        console.log('- Mobile-responsive design');




