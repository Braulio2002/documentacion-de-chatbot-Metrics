/**
 * Three.js Background - Fondo 3D Interactivo
 * Documentación Interactiva - Chatbot IA
 * 
 * Este módulo crea un fondo 3D espectacular con partículas flotantes,
 * geometrías dinámicas y efectos de luz que responden al movimiento del usuario.
 */

class ThreeJSBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.lights = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isInitialized = false;
        this.animationId = null;
        
        // Verificar si Three.js está disponible
        if (typeof THREE === 'undefined') {
            console.warn('Three.js no está disponible');
            return;
        }
        
        this.init();
    }

    init() {
        try {
            // Crear escena
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x001122);
            
            // Crear cámara
            this.camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                1000
            );
            this.camera.position.z = 50;
            
            // Crear renderer
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            this.renderer.shadowMap.enabled = false;
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Agregar al DOM
            const container = document.getElementById('threejs-background');
            if (container) {
                container.appendChild(this.renderer.domElement);
            }
            
            // Crear elementos 3D
            this.createParticles();
            this.createGeometries();
            this.createLights();
            this.createFloatingElements();
            
            // Event listeners
            this.addEventListeners();
            
            // Iniciar animación
            this.animate();
            
            this.isInitialized = true;
            console.log('🎨 Fondo 3D inicializado correctamente');
            
        } catch (error) {
            console.error('Error al inicializar Three.js background:', error);
        }
    }

    createParticles() {
        // Crear partículas flotantes
        const particleCount = 400;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Posiciones aleatorias
            positions[i] = (Math.random() - 0.5) * 400;
            positions[i + 1] = (Math.random() - 0.5) * 400;
            positions[i + 2] = (Math.random() - 0.5) * 400;
            
            // Colores con gradiente azul
            const color = new THREE.Color();
            color.setHSL(0.6, 0.9, 0.6 + Math.random() * 0.4);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 5,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        this.particles.push(particleSystem);
        this.scene.add(particleSystem);
    }

    createGeometries() {
        // Crear geometrías flotantes
        const geometries = [
            new THREE.IcosahedronGeometry(5, 0),
            new THREE.OctahedronGeometry(4, 0),
            new THREE.TetrahedronGeometry(4, 0)
        ];
        
        geometries.forEach((geometry, index) => {
            const material = new THREE.MeshPhongMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            this.geometries.push(mesh);
            this.scene.add(mesh);
        });
    }

    createLights() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Luz direccional principal
        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1.2);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = false;
        this.lights.push(directionalLight);
        this.scene.add(directionalLight);
        
        // Luces puntuales
        for (let i = 0; i < 3; i++) {
            const pointLight = new THREE.PointLight(0x00d4ff, 0.9, 100);
            pointLight.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            this.lights.push(pointLight);
            this.scene.add(pointLight);
        }
    }

    createFloatingElements() {
        // Crear elementos flotantes adicionales
        const torusGeometry = new THREE.TorusGeometry(10, 4, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.5,
            wireframe: true
        });
        
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(40, -40, 50);
        this.scene.add(torus);
        this.geometries.push(torus);
        
        // Esfera de cristal
        const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0xec4899,
            transparent: true,
            opacity: 0.4,
            wireframe: true
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(-50, 40, 40);
        this.scene.add(sphere);
        this.geometries.push(sphere);
    }

    addEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
        
        // Scroll
        window.addEventListener('scroll', () => {
            if (this.camera) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                this.camera.position.y = parallax * 0.1;
            }
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Animar partículas
        this.particles.forEach(particleSystem => {
            const positions = particleSystem.geometry?.attributes?.position?.array;
            if (positions) {
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.15;
                    positions[i] += Math.cos(time + positions[i + 1] * 0.01) * 0.08;
                }
                particleSystem.geometry.attributes.position.needsUpdate = true;
                particleSystem.rotation.y += 0.002;
            }
        });
        
        // Animar geometrías
        this.geometries.forEach((geometry, index) => {
            if (geometry) {
                geometry.rotation.x += 0.008 + index * 0.002;
                geometry.rotation.y += 0.005 + index * 0.002;
                geometry.position.y += Math.sin(time + index) * 0.15;
            }
        });
        
        // Animar luces
        this.lights.forEach((light, index) => {
            if (light && light.type === 'PointLight') {
                light.position.x = Math.sin(time * 0.5 + index) * 100;
                light.position.y = Math.cos(time * 0.3 + index) * 100;
                light.intensity = 0.5 + Math.sin(time + index) * 0.3;
            }
        });
        
        // Rotar cámara suavemente
        if (this.camera) {
            this.camera.position.x += (this.mouseX * 20 - this.camera.position.x) * 0.03;
            this.camera.position.y += (this.mouseY * 20 - this.camera.position.y) * 0.03;
            this.camera.lookAt(this.scene.position);
        }
        
        // Renderizar
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Método para limpiar recursos
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Limpiar geometrías
        this.geometries.forEach(geometry => {
            if (geometry.geometry) {
                geometry.geometry.dispose();
            }
            if (geometry.material) {
                geometry.material.dispose();
            }
        });
        
        // Limpiar partículas
        this.particles.forEach(particleSystem => {
            if (particleSystem.geometry) {
                particleSystem.geometry.dispose();
            }
            if (particleSystem.material) {
                particleSystem.material.dispose();
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThreeJSBackground();
    });
} else {
    new ThreeJSBackground();
}

// Exportar para uso modular
export { ThreeJSBackground }; 