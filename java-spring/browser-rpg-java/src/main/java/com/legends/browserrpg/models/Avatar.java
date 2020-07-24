package com.legends.browserrpg.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "avatars")
public class Avatar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "max_hp")
    private int maxHP;

    @Column(name = "current_hp")
    private int currentHP;

    @Column(name = "power")
    private int power;

    @Column(name = "score")
    private int score;

    @Column(name = "alive")
    private Boolean alive;

    @Column(name = "sprite_id")
    private int spriteID;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = true)
    private Player player;


    public Avatar(String name, Player player, int spriteID, int maxHP, int power) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.power = power;
        this.score = 0;
        this.alive = true;
        this.player = player;
        this.spriteID = spriteID;
    }

    public Avatar() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public void setMaxHP(int maxHP) {
        this.maxHP = maxHP;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public void setCurrentHP(int currentHP) {
        this.currentHP = currentHP;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Boolean getAlive() {
        return alive;
    }

    public void setAlive(Boolean alive) {
        this.alive = alive;
    }


    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getSpriteID() {
        return spriteID;
    }

    public void setSpriteID(int spriteID) {
        this.spriteID = spriteID;
    }
}
