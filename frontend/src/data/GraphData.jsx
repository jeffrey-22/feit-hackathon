const initialGraphData = {
  // ===== Nodes =====
  nodes: [
    // Jobs
    { id: "job_architect", name: "Architect", type: "job", time: 0, value: 0.92 },
    { id: "job_game_designer", name: "Game Scene Designer", type: "job", time: 0, value: 0.91 },

    // Common Skills
    { id: "skill_spatial_sense", name: "Spatial Sense", type: "skill", time: 80, value: 0.80 },
    { id: "skill_visual_design", name: "Visual Design", type: "skill", time: 100, value: 0.85 },
    { id: "skill_structural_logic", name: "Structural Logic", type: "skill", time: 120, value: 0.88 },
    { id: "skill_user_flow", name: "User Flow", type: "skill", time: 60, value: 0.75 },
    { id: "skill_project_management", name: "Project Management", type: "skill", time: 90, value: 0.81 },

    // Unique Skills
    // --- Architect Skills ---
    { id: "skill_autocad", name: "AutoCAD", type: "skill", time: 100, value: 0.82 },
    { id: "skill_building_codes", name: "Building Codes", type: "skill", time: 70, value: 0.78 },
    { id: "skill_sustainable_design", name: "Sustainable Design", type: "skill", time: 80, value: 0.79 },

    // --- Game Designer Skills ---
    { id: "skill_game_engine", name: "Game Engine", type: "skill", time: 120, value: 0.86 },
    { id: "skill_3d_modeling_game", name: "3D Modeling", type: "skill", time: 140, value: 0.88 },
    { id: "skill_texturing", name: "Texturing & Shading", type: "skill", time: 100, value: 0.84 },
  ],

  // ===== Edges (only meaningful relations; no necessity=0) =====
  edges: [
    // Architect Edges
    { id: "e001", source: "skill_spatial_sense", target: "job_architect", necessity: 0.80 },
    { id: "e002", source: "skill_visual_design", target: "job_architect", necessity: 0.75 },
    { id: "e003", source: "skill_structural_logic", target: "job_architect", necessity: 0.95 },
    { id: "e004", source: "skill_user_flow", target: "job_architect", necessity: 0.65 },
    { id: "e005", source: "skill_autocad", target: "job_architect", necessity: 0.85 },
    { id: "e007", source: "skill_building_codes", target: "job_architect", necessity: 0.92 },
    { id: "e008", source: "skill_sustainable_design", target: "job_architect", necessity: 0.70 },
    { id: "e009", source: "skill_project_management", target: "job_architect", necessity: 0.88 },

    // Game Scene Designer Edges
    { id: "e010", source: "skill_spatial_sense", target: "job_game_designer", necessity: 0.90 },
    { id: "e011", source: "skill_visual_design", target: "job_game_designer", necessity: 0.95 },
    { id: "e012", source: "skill_structural_logic", target: "job_game_designer", necessity: 0.60 },
    { id: "e013", source: "skill_user_flow", target: "job_game_designer", necessity: 0.80 },
    { id: "e014", source: "skill_game_engine", target: "job_game_designer", necessity: 0.92 },
    { id: "e016", source: "skill_3d_modeling_game", target: "job_game_designer", necessity: 0.88 },
    { id: "e017", source: "skill_texturing", target: "job_game_designer", necessity: 0.85 },
    { id: "e019", source: "skill_project_management", target: "job_game_designer", necessity: 0.70 },
  ],
};

export default initialGraphData;
