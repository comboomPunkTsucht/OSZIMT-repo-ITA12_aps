if status is-interactive
    # Theme

    set -g fish_autosuggestion_enabled 1
    set -g theme_display_git no
    set -g theme_display_git_dirty no
    set -g theme_display_git_untracked no
    set -g theme_display_git_ahead_verbose no
    set -g theme_display_git_dirty_verbose no
    set -g theme_display_git_stashed_verbose no
    set -g theme_display_git_default_branch no
    set -g theme_git_default_branches master main
    set -g theme_git_worktree_support yes
    set -g theme_use_abbreviated_branch_name no
    set -g theme_display_vagrant yes
    set -g theme_display_docker_machine no
    set -g theme_display_k8s_context no
    set -g theme_display_hg no
    set -g theme_display_virtualenv no
    set -g theme_display_nix no
    set -g theme_display_ruby no
    set -g theme_display_node no
    set -g theme_display_user ssh
    set -g theme_display_hostname ssh
    set -g theme_display_vi no
    set -g theme_display_date yes
    set -g theme_display_cmd_duration yes
    set -g theme_title_display_process no
    set -g theme_title_display_path no
    set -g theme_title_display_user yes
    set -g theme_title_use_abbreviated_path no
    set -g theme_date_format "+%a %H:%M"
    set -g theme_date_timezone Europe/Berlin
    set -g theme_avoid_ambiguous_glyphs yes
    set -g theme_powerline_fonts no
    set -g theme_nerd_fonts yes
    set -g theme_show_exit_status yes
    set -g theme_display_jobs_verbose no
    set -g default_user your_normal_user
    set -g theme_color_scheme solarized-dark
    set -g fish_prompt_pwd_dir_length 0
    set -g theme_project_dir_length 1
    set -g theme_newline_cursor yes
    set -g theme_newline_prompt (set_color $fish_promt_color_2) '' (set_color $fish_promt_color_1 )' $ '

    #fish_prompt

    echo "--------------------------------------------------------------------------------"
    "/workspaces/OSZIMT-repo-ITA12_aps/.config/ookla-speedtest-1.1.1-linux-x86_64/speedtest"
    echo "--------------------------------------------------------------------------------"
    sudo nala update > /dev/null
    sudo nala upgrade -y > /dev/null
    echo "nala update finished and upgrade finished"
    neofetch
end

