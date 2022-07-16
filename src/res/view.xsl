<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="root">
    <div class="widget-list">
      <xsl:call-template name="list-events">
      </xsl:call-template>
    </div>
    <div class="widget-list">
      <xsl:call-template name="list-habits">
      </xsl:call-template>
    </div>
  </xsl:template>
  
  <!-- Events -->
  <xsl:template name="list-events">
    <xsl:variable name="date" select="@datetime"/>
    
    <h1>Anstehende Termine</h1>
    
    <xsl:if test="count(events/*[contains(start, $date)]) = 0">
      <span class="undefined-description">Keine Termine für heute</span>
    </xsl:if>
    
    <xsl:for-each select="events/*[contains(start, $date)]">
      <div class="app-card">
        <xsl:call-template name="title"/>
        
        <xsl:call-template name="event-timestamp"/>
        
        <xsl:call-template name="description"/>
        
        <xsl:call-template name="actions">
          <xsl:with-param name="href" select="'calendar'"/>
        </xsl:call-template>
      </div>
    </xsl:for-each>
  </xsl:template>
  
  <!-- Event-Time-Stamp -->
  <xsl:template name="event-timestamp">
    <p class="event-time">
      von:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./start"/>
      </xsl:call-template>
      
      bis:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./end"/>
      </xsl:call-template>
    </p>  
  </xsl:template>  
  
  <!-- Habits -->
  <xsl:template name="list-habits">
    <h1>Aktive Gewohnheiten</h1>
    
    <xsl:if test="count(habits/*) = 0">
      <span class="undefined-description">Keine Gewohnheiten angelegt</span>
    </xsl:if>
    
    <xsl:for-each select="habits/*">
      
      <div class="app-card">
        <xsl:call-template name="title"/>
        
        <xsl:call-template name="habit-timestamp"/>
        
        <xsl:call-template name="description"/>
        
        <xsl:call-template name="repeat"/>
        
        <xsl:call-template name="alternate-list"/>
        
        <xsl:call-template name="actions">
          <xsl:with-param name="href" select="'planner'"/>
        </xsl:call-template>
      </div>
    </xsl:for-each>
  </xsl:template>
  
  <!-- Habit-Time-Stamp -->
  <xsl:template name="habit-timestamp">
    <p class="event-time">
      zwischen:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./start"/>
      </xsl:call-template>
      
      und:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./end"/>
      </xsl:call-template>
      
      |
      
      Ideale Zeit:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./idealTime"/>
      </xsl:call-template>
      
      <br/>
      
      Dauer:
      <xsl:value-of select="./duration"/>
      Minuten
    </p>
  </xsl:template>
  
  <!-- Repeat -->
  <xsl:template name="repeat">
    <div class="repeat-section">
      <xsl:if test="./repeat/repeating/@type='date'">
        <p>Wiederholen bis: 
          <xsl:call-template name="format-iso-date">
            <xsl:with-param name="iso-date" select="./repeat/repeating"/>
          </xsl:call-template> 
        </p>
      </xsl:if>
      
      <xsl:if test="./repeat/repeating/@type='number'">
        <p>Wiederholungen: <xsl:value-of select="./repeat/repeating"/> Woche(n)</p>
      </xsl:if>
      
      <xsl:call-template name="day-list"/>
    </div>   
  </xsl:template>
  
  <!-- Day-List -->
  <xsl:template name="day-list">
    <div class="day-list app-border">
      <span >
        <xsl:if test="repeat/days/*=1">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Mo
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=2">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Di
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=3">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Mi
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=4">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Do
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=5">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Fr
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=6">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Sa
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=0">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        So
      </span>
    </div>
  </xsl:template>
  
  <!-- Alternate-Habits -->
  <xsl:template name="alternate-list">
    <div class="mat-expansion-panel alternate-habit-list">
      <div class="mat-expansion-panel-header mat-focus-indicator">
        <button onclick="window.dispatchEvent(new Event('toggle-expand-habits'));" class="mat-focus-indicator mat-icon-button mat-button-base">
          <span class="mat-button-wrapper">
            <mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
              navigate_before
            </mat-icon>
          </span>
          <span class="mat-button-focus-overlay"></span>
        </button>
      </div>
      <div class="mat-expansion-panel-body">
        LIST_ALTERNATE_HABIT_EVENTS
      </div>
    </div>
  </xsl:template>
  
  <!-- Title -->
  <xsl:template name="title">
    <div class="color-label">
      <xsl:attribute name="style">background-color:<xsl:value-of select="./color/primary"/></xsl:attribute>
    </div>
    <h2><xsl:value-of select="./title"/></h2>     
  </xsl:template>
  
  <!-- Description -->
  <xsl:template name="description">
    <p>
      <xsl:choose>
        <xsl:when test="./description='undefined'">
          <xsl:attribute name="class">undefined-description</xsl:attribute>
          - Keine Beschreibung -
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="./description"/>
        </xsl:otherwise>
      </xsl:choose>
    </p> 
  </xsl:template>
  
  <!-- Actions -->
  <xsl:template name="actions">
    <xsl:param name="href"/>
    <div class="actions">
      <a class="mat-focus-indicator mat-stroked-button mat-button-base">
        <xsl:attribute name="href">#/<xsl:value-of select="$href"/></xsl:attribute>
        <span class="mat-button-wrapper">Anzeigen</span>
        <span class="mat-button-focus-overlay"></span>
      </a>
    </div>  
  </xsl:template>
  
  
  
  
  <!-- DateTime zu Date Formatieren (MM dd yyyy)-->
  <xsl:template name="format-iso-date">
    <xsl:param name="iso-date"/>
    <xsl:variable name="year" select="substring($iso-date, 1, 4)"/>
    <xsl:variable name="month" select="substring($iso-date, 6, 2)"/>
    <xsl:variable name="day" select="substring($iso-date, 9, 2)"/>
    <xsl:value-of select="concat($month, '.',$day, '.', $year)"/>
  </xsl:template>
  
  <!-- DateTime zu Zeit formatieren (HH:mm) -->
  <xsl:template name="format-time">
    <xsl:param name="iso-date"/>
    <xsl:variable name="hour" select="substring($iso-date, 12, 2)"/>
    <xsl:variable name="minute" select="substring($iso-date, 15, 2)"/>
    <xsl:value-of select="concat($hour,':',$minute)"/>
  </xsl:template>
  
</xsl:stylesheet>
