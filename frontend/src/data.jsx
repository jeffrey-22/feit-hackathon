// src/data.js - Optimized data with correct dependencies and English names.

// ----------------------------------------------------
// Helper function: Get a map of node names to their generated IDs
// ----------------------------------------------------
const getNodeMap = (nodes) => {
    const map = {};
    nodes.forEach(node => {
        let id = node.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_$/, '');
        map[node.name] = id;
        node.id = id; // Add ID to the original node object

        // Set Dagre rank for job nodes to align them to the right
        if (node.type.toLowerCase() === 'job') {
            node.type = 'job'; // 统一类型
            node.dagre = { rank: 'max' };
        } else if (node.type.toLowerCase() === 'skill') {
            node.type = 'skill'; // 统一类型
        } else {
            console.log(node.type);
        }
    });
    return map;
};

const originalNodes = [
    // ----------------------------------------------------
    // 1. Target Jobs (Will be fixed to the far right)
    // ----------------------------------------------------
    { "name": "Data Scientist", "type": "Job", "time": 1200, "value": 93 },
    { "name": "Frontend Engineer", "type": "Job", "time": 900, "value": 90 },
    { "name": "Algorithm Engineer", "type": "Job", "time": 1400, "value": 95 },
    { "name": "Backend Engineer", "type": "Job", "time": 1100, "value": 92 },

    // ----------------------------------------------------
    // 2. Core & Specialised Skills
    // ----------------------------------------------------
    // Foundational
    { "name": "Computer Science Fundamentals", "type": "Skill", "time": 100, "value": 95 },
    { "name": "Git", "type": "Skill", "time": 40, "value": 90 },
    { "name": "Linux", "type": "Skill", "time": 60, "value": 85 },
    { "name": "Data Structures", "type": "Skill", "time": 150, "value": 94 },
    { "name": "Algorithms", "type": "Skill", "time": 200, "value": 96 },

    // Programming Languages
    { "name": "Python", "type": "Skill", "time": 120, "value": 92 },
    { "name": "C++", "type": "Skill", "time": 200, "value": 88 },
    { "name": "JavaScript", "type": "Skill", "time": 140, "value": 91 },
    { "name": "TypeScript", "type": "Skill", "time": 80, "value": 89 },

    // Frontend
    { "name": "HTML/CSS", "type": "Skill", "time": 100, "value": 88 },
    { "name": "React", "type": "Skill", "time": 160, "value": 90 },
    { "name": "Build Tools (Vite/Webpack)", "type": "Skill", "time": 70, "value": 86 },
    { "name": "State Management (Redux/Zustand)", "type": "Skill", "time": 90, "value": 87 },

    // Backend
    { "name": "Node.js", "type": "Skill", "time": 150, "value": 87 },
    { "name": "System Design", "type": "Skill", "time": 180, "value": 93 },
    { "name": "REST API Design", "type": "Skill", "time": 100, "value": 90 },
    { "name": "Microservices", "type": "Skill", "time": 120, "value": 88 },
    { "name": "Databases (SQL)", "type": "Skill", "time": 100, "value": 91 },
    { "name": "Databases (NoSQL)", "type": "Skill", "time": 80, "value": 85 },

    // Data Science & ML
    { "name": "Statistics", "type": "Skill", "time": 150, "value": 92 },
    { "name": "Pandas/NumPy", "type": "Skill", "time": 90, "value": 89 },
    { "name": "Data Visualization", "type": "Skill", "time": 80, "value": 84 },
    { "name": "Machine Learning", "type": "Skill", "time": 250, "value": 95 },
    { "name": "Deep Learning (PyTorch/TensorFlow)", "type": "Skill", "time": 220, "value": 94 },

    // DevOps & Infrastructure
    { "name": "Docker", "type": "Skill", "time": 60, "value": 88 },
    { "name": "Kubernetes", "type": "Skill", "time": 90, "value": 87 },
    { "name": "CI/CD", "type": "Skill", "time": 70, "value": 86 },
    { "name": "Cloud Computing (AWS/GCP/Azure)", "type": "Skill", "time": 120, "value": 89 },

    // General
    { "name": "Unit/Integration Testing", "type": "Skill", "time": 80, "value": 85 }
];

const originalEdges = [
    // ----------------------------------------------------
    // Skill Dependencies
    // ----------------------------------------------------
    // Foundational Path
    { "node_start_name": "Computer Science Fundamentals", "node_end_name": "Data Structures", "necessity": 0.9 },
    { "node_start_name": "Data Structures", "node_end_name": "Algorithms", "necessity": 0.95 },
    { "node_start_name": "Algorithms", "node_end_name": "System Design", "necessity": 0.6 },
    { "node_start_name": "Linux", "node_end_name": "Docker", "necessity": 0.7 },

    // Language Dependencies
    { "node_start_name": "JavaScript", "node_end_name": "TypeScript", "necessity": 0.9 },

    // Frontend Path
    { "node_start_name": "HTML/CSS", "node_end_name": "JavaScript", "necessity": 0.5 }, // Not a strict prerequisite, but helpful context
    { "node_start_name": "JavaScript", "node_end_name": "React", "necessity": 0.95 },
    { "node_start_name": "React", "node_end_name": "State Management (Redux/Zustand)", "necessity": 0.8 },
    { "node_start_name": "React", "node_end_name": "Build Tools (Vite/Webpack)", "necessity": 0.75 },
    { "node_start_name": "TypeScript", "node_end_name": "React", "necessity": 0.6 }, // Optional but recommended

    // Backend Path
    { "node_start_name": "JavaScript", "node_end_name": "Node.js", "necessity": 0.95 },
    { "node_start_name": "Node.js", "node_end_name": "REST API Design", "necessity": 0.8 },
    { "node_start_name": "Python", "node_end_name": "REST API Design", "necessity": 0.8 },
    { "node_start_name": "System Design", "node_end_name": "Microservices", "necessity": 0.85 },
    { "node_start_name": "REST API Design", "node_end_name": "Microservices", "necessity": 0.7 },

    // Data Science Path
    { "node_start_name": "Python", "node_end_name": "Pandas/NumPy", "necessity": 0.95 },
    { "node_start_name": "Statistics", "node_end_name": "Machine Learning", "necessity": 0.85 },
    { "node_start_name": "Pandas/NumPy", "node_end_name": "Machine Learning", "necessity": 0.9 },
    { "node_start_name": "Machine Learning", "node_end_name": "Deep Learning (PyTorch/TensorFlow)", "necessity": 0.9 },
    { "node_start_name": "Pandas/NumPy", "node_end_name": "Data Visualization", "necessity": 0.8 },

    // DevOps Path
    { "node_start_name": "Docker", "node_end_name": "Kubernetes", "necessity": 0.9 },
    { "node_start_name": "Git", "node_end_name": "CI/CD", "necessity": 0.9 },
    { "node_start_name": "Docker", "node_end_name": "CI/CD", "necessity": 0.8 },
    { "node_start_name": "Kubernetes", "node_end_name": "Cloud Computing (AWS/GCP/Azure)", "necessity": 0.7 },

    // ----------------------------------------------------
    // Skill -> Job Mappings
    // ----------------------------------------------------
    // General Skills to All Jobs
    ...["Data Scientist", "Frontend Engineer", "Algorithm Engineer", "Backend Engineer"].flatMap(job => [
        { "node_start_name": "Git", "node_end_name": job, "necessity": 0.85 },
        { "node_start_name": "Data Structures", "node_end_name": job, "necessity": 0.8 },
        { "node_start_name": "Algorithms", "node_end_name": job, "necessity": 0.8 },
        { "node_start_name": "Unit/Integration Testing", "node_end_name": job, "necessity": 0.65 },
    ]),

    // Frontend Engineer
    { "node_start_name": "HTML/CSS", "node_end_name": "Frontend Engineer", "necessity": 0.95 },
    { "node_start_name": "JavaScript", "node_end_name": "Frontend Engineer", "necessity": 0.95 },
    { "node_start_name": "React", "node_end_name": "Frontend Engineer", "necessity": 0.9 },
    { "node_start_name": "TypeScript", "node_end_name": "Frontend Engineer", "necessity": 0.8 },
    { "node_start_name": "Build Tools (Vite/Webpack)", "node_end_name": "Frontend Engineer", "necessity": 0.75 },
    { "node_start_name": "State Management (Redux/Zustand)", "node_end_name": "Frontend Engineer", "necessity": 0.7 },

    // Backend Engineer
    { "node_start_name": "Python", "node_end_name": "Backend Engineer", "necessity": 0.8 },
    { "node_start_name": "Node.js", "node_end_name": "Backend Engineer", "necessity": 0.8 },
    { "node_start_name": "Databases (SQL)", "node_end_name": "Backend Engineer", "necessity": 0.9 },
    { "node_start_name": "Databases (NoSQL)", "node_end_name": "Backend Engineer", "necessity": 0.7 },
    { "node_start_name": "REST API Design", "node_end_name": "Backend Engineer", "necessity": 0.9 },
    { "node_start_name": "System Design", "node_end_name": "Backend Engineer", "necessity": 0.9 },
    { "node_start_name": "Microservices", "node_end_name": "Backend Engineer", "necessity": 0.75 },
    { "node_start_name": "Docker", "node_end_name": "Backend Engineer", "necessity": 0.8 },
    { "node_start_name": "CI/CD", "node_end_name": "Backend Engineer", "necessity": 0.7 },
    { "node_start_name": "Cloud Computing (AWS/GCP/Azure)", "node_end_name": "Backend Engineer", "necessity": 0.75 },

    // Data Scientist
    { "node_start_name": "Python", "node_end_name": "Data Scientist", "necessity": 0.95 },
    { "node_start_name": "Statistics", "node_end_name": "Data Scientist", "necessity": 0.9 },
    { "node_start_name": "Pandas/NumPy", "node_end_name": "Data Scientist", "necessity": 0.9 },
    { "node_start_name": "Databases (SQL)", "node_end_name": "Data Scientist", "necessity": 0.8 },
    { "node_start_name": "Data Visualization", "node_end_name": "Data Scientist", "necessity": 0.85 },
    { "node_start_name": "Machine Learning", "node_end_name": "Data Scientist", "necessity": 0.95 },
    { "node_start_name": "Deep Learning (PyTorch/TensorFlow)", "node_end_name": "Data Scientist", "necessity": 0.8 },

    // Algorithm Engineer
    { "node_start_name": "C++", "node_end_name": "Algorithm Engineer", "necessity": 0.9 },
    { "node_start_name": "Python", "node_end_name": "Algorithm Engineer", "necessity": 0.85 },
    { "node_start_name": "Algorithms", "node_end_name": "Algorithm Engineer", "necessity": 0.98 },
    { "node_start_name": "Data Structures", "node_end_name": "Algorithm Engineer", "necessity": 0.95 },
    { "node_start_name": "Machine Learning", "node_end_name": "Algorithm Engineer", "necessity": 0.8 },
    { "node_start_name": "Deep Learning (PyTorch/TensorFlow)", "node_end_name": "Algorithm Engineer", "necessity": 0.75 }
];

// Run the conversion utility
const nodeMap = getNodeMap(originalNodes);

// ----------------------------------------------------
// 3. Prepare Initial Edges
// ----------------------------------------------------
const initialEdges = [...originalEdges];

// ----------------------------------------------------
// 4. Convert Edges to ID format
// ----------------------------------------------------
const finalEdges = initialEdges.map((edge, index) => {
    const sourceId = nodeMap[edge.node_start_name];
    const targetId = nodeMap[edge.node_end_name];

    if (!sourceId || !targetId) {
        console.warn(`Warning: Edge skipped due to missing node ID for: ${edge.node_start_name} -> ${edge.node_end_name}`);
        return null;
    }

    return {
        id: `e-${sourceId}-${targetId}-${index}`, // Generate unique ID
        source: sourceId,
        target: targetId,
        necessity: edge.necessity,
    };
}).filter(edge => edge !== null);


// ----------------------------------------------------
// Final Data Structure
// ----------------------------------------------------
const initialGraphData = {
    nodes: originalNodes,
    edges: finalEdges,
};

export default initialGraphData;
