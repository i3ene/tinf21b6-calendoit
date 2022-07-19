<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:include href="res/date.xsl"/>
  <xsl:include href="res/functions.xsl"/>
  
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
        
        <xsl:call-template name="widget-actions">
          <xsl:with-param name="href" select="'calendar'"/>
        </xsl:call-template>
      </div>
    </xsl:for-each>
  </xsl:template>
  
  <!-- Event-Time-Stamp -->
  <xsl:template name="event-timestamp">
    <p class="event-time">
      von:
      <xsl:call-template name="format-to-time">
        <xsl:with-param name="iso-datetime" select="./start"/>
      </xsl:call-template>
      
      bis:
      <xsl:call-template name="format-to-time">
        <xsl:with-param name="iso-datetime" select="./end"/>
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
        
        <xsl:call-template name="widget-actions">
          <xsl:with-param name="href" select="'planner'"/>
        </xsl:call-template>
      </div>
    </xsl:for-each>
  </xsl:template>
  
  <!-- Habit-Time-Stamp -->
  <xsl:template name="habit-timestamp">
    <p class="event-time">
      zwischen:
      <xsl:call-template name="format-to-time">
        <xsl:with-param name="iso-datetime" select="./start"/>
      </xsl:call-template>
      
      und:
      <xsl:call-template name="format-to-time">
        <xsl:with-param name="iso-datetime" select="./end"/>
      </xsl:call-template>
      
      |
      
      Dauer:
      <xsl:value-of select="./duration"/>
      Minuten
      
      <br/>
      
      Start:
      <xsl:call-template name="format-to-date">
        <xsl:with-param name="iso-datetime" select="./start"/>
      </xsl:call-template>
      
    </p>
  </xsl:template>
  
  <!-- Timespan -->
  <xsl:template name="timespan">
    <xsl:variable name="startDate">
      <xsl:call-template name="adjust-to-timezone">
        <xsl:with-param name="datetime" select="./start"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="endDate">
      <xsl:call-template name="adjust-to-timezone">
        <xsl:with-param name="datetime" select="./end"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="idealTimeDate">
      <xsl:call-template name="adjust-to-timezone">
        <xsl:with-param name="datetime" select="./idealTime"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="startHour" select="substring($startDate,12,2)"/>
    <xsl:variable name="startMinute" select="substring($startDate,15,2)"/>
    <xsl:variable name="start" select="$startHour * 60 + $startMinute"/>
    
    <xsl:variable name="endHour" select="substring($endDate,12,2)"/>
    <xsl:variable name="endMinute" select="substring($endDate,15,2)"/>
    <xsl:variable name="end" select="$endHour * 60 + $endMinute"/>
    
    <xsl:variable name="idealTimeHour" select="substring($idealTimeDate,12,2)"/>
    <xsl:variable name="idealTimeMinute" select="substring($idealTimeDate,15,2)"/>
    <xsl:variable name="idealTime" select="$idealTimeHour * 60 + $idealTimeMinute"/>
    
    <xsl:variable name="duration" select="./duration"/>
    <xsl:variable name="idealTimeEnd" select="$idealTime + $duration"/>
    
    <xsl:variable name="day" select="24 * 60"/>    
    
    <div class="times-display">
      <div class="timespan-bar">
        <xsl:attribute name="style">
          width:
          <xsl:call-template name="percent">
            <xsl:with-param name="numerator" select="$end - $start"/>
            <xsl:with-param name="denominator" select="$day"/>
          </xsl:call-template>%;
          margin-left:
          <xsl:call-template name="percent">
            <xsl:with-param name="numerator" select="$start"/>
            <xsl:with-param name="denominator" select="$day"/>
          </xsl:call-template>%;
        </xsl:attribute>
        <div class="time-bar">
          <xsl:attribute name="style">
            width:
            <xsl:call-template name="percent">
              <xsl:with-param name="numerator" select="$idealTimeEnd - $idealTime"/>
              <xsl:with-param name="denominator" select="$end - $start"/>
            </xsl:call-template>%;
            margin-left:
            <xsl:call-template name="percent">
              <xsl:with-param name="numerator" select="$idealTime - $start"/>
              <xsl:with-param name="denominator" select="$end - $start"/>
            </xsl:call-template>%;
          </xsl:attribute>
          <div class="timestart-bar">
            <div class="timestart-text">
              <xsl:value-of select="$idealTimeHour"/>:<xsl:value-of select="$idealTimeMinute"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </xsl:template>
  
  <!-- Repeat -->
  <xsl:template name="repeat">
    <div class="repeat-section">
      <xsl:call-template name="timespan"/>
      <div class="repeat-display">
        <xsl:call-template name="day-list"/>
        <xsl:call-template name="repeat-description"/>
      </div>
    </div>   
  </xsl:template>
  
  <!-- Repeat-Description -->
  <xsl:template name="repeat-description">
    <p>
      <xsl:if test="./repeat/repeating/@type='date'">
        Wiederholen bis: 
        <xsl:call-template name="format-to-date">
          <xsl:with-param name="iso-datetime" select="./repeat/repeating"/>
        </xsl:call-template>
      </xsl:if>
      
      <xsl:if test="./repeat/repeating/@type='number'">
        Wiederholungen: <xsl:value-of select="./repeat/repeating"/> Woche(n)
      </xsl:if>
    </p>
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
      <div class="mat-expansion-panel-header mat-focus-indicator" onclick="window.dispatchEvent(new Event('toggle-expand-habits'));">
        <button class="mat-focus-indicator mat-icon-button mat-button-base">
          <span class="mat-button-wrapper">
            <mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
              navigate_before
            </mat-icon>
          </span>
          <span class="mat-button-focus-overlay"></span>
        </button>
      </div>
      <div class="mat-expansion-panel-body minimized">
        <xsl:call-template name="alternate-items"/>
      </div>
    </div>
  </xsl:template>
  
  <!-- Alternate-Habit -->
  <xsl:template name="alternate-items">
    <xsl:if test="count(./alternateEvents/*) = 0">
      <span class="undefined-description">Keine alternativen Zeiten vorhanden</span>
    </xsl:if>
    <xsl:for-each select="./alternateEvents/*">
      <div class="alternate-item">
        <span>
          <xsl:call-template name="format-to-date">
            <xsl:with-param name="iso-datetime" select="./start"/>
          </xsl:call-template>
          
          -
          
          <xsl:call-template name="format-to-time">
            <xsl:with-param name="iso-datetime" select="./start"/>
          </xsl:call-template>
        </span>
      </div>
    </xsl:for-each>
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
        <xsl:when test="not(./description)">
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
  <xsl:template name="widget-actions">
    <xsl:param name="href"/>
    <div class="widget-actions">
      <a class="mat-focus-indicator mat-stroked-button mat-button-base">
        <xsl:attribute name="href">#/<xsl:value-of select="$href"/></xsl:attribute>
        <span class="mat-button-wrapper">Anzeigen</span>
        <span class="mat-button-focus-overlay"></span>
      </a>
    </div>  
  </xsl:template> 
  
</xsl:stylesheet>
