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
  
  <!-- Timespan -->
  <xsl:template name="timespan">
    <xsl:variable name="startDate">
      <xsl:call-template name="timezone">
        <xsl:with-param name="dateTime" select="./start"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="endDate">
      <xsl:call-template name="timezone">
        <xsl:with-param name="dateTime" select="./end"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="idealTimeDate">
      <xsl:call-template name="timezone">
        <xsl:with-param name="dateTime" select="./idealTime"/>
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
        <xsl:call-template name="format-iso-date">
          <xsl:with-param name="iso-date" select="./repeat/repeating"/>
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
  
  
  <!-- *Functions* -->

  <!-- Percentage -->
  <xsl:template name="percent">
    <xsl:param name="numerator"/>
    <xsl:param name="denominator"/>
    <xsl:value-of select="$numerator div $denominator * 100"/> 
  </xsl:template>
  
  <!-- DateTime zu Date Formatieren (MM dd yyyy)-->
  <xsl:template name="format-iso-date">
    <xsl:param name="iso-date"/>
    
    <xsl:variable name="date">
      <xsl:call-template name="timezone">
        <xsl:with-param name="dateTime" select="$iso-date"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="year" select="substring($date, 1, 4)"/>
    <xsl:variable name="month" select="substring($date, 6, 2)"/>
    <xsl:variable name="day" select="substring($date, 9, 2)"/>
    <xsl:value-of select="concat($month, '.',$day, '.', $year)"/>
  </xsl:template>
  
  <!-- DateTime zu Zeit formatieren (HH:mm) -->
  <xsl:template name="format-time">
    <xsl:param name="iso-date"/>
    
    <xsl:variable name="date">
      <xsl:call-template name="timezone">
        <xsl:with-param name="dateTime" select="$iso-date"/>
      </xsl:call-template>
    </xsl:variable>
    
    <xsl:variable name="hour" select="substring($date, 12, 2)"/>
    <xsl:variable name="minute" select="substring($date, 15, 2)"/>
    <xsl:value-of select="concat($hour,':',$minute)"/>
  </xsl:template>
  
  <!-- Timezone offset -->
  <xsl:template name="timezone">
    <xsl:param name="dateTime"/>
    <xsl:param name="hours" select="2"/>
    
    <xsl:variable name="dateTime-in-seconds">
      <xsl:call-template name="dateTime-to-seconds">
        <xsl:with-param name="dateTime" select="$dateTime"/>
      </xsl:call-template>
    </xsl:variable> 
    
    <xsl:variable name="total-seconds" select="$dateTime-in-seconds + 3600 * $hours" />
    
    <!-- new date -->
    <xsl:variable name="new-date">
      <xsl:call-template name="JDN-to-Gregorian">
        <xsl:with-param name="JDN" select="floor($total-seconds div 86400)"/>
      </xsl:call-template>
    </xsl:variable> 
    <!-- new time -->
    <xsl:variable name="t" select="$total-seconds mod 86400" />
    <xsl:variable name="h" select="floor($t div 3600)" />
    <xsl:variable name="r" select="$t mod 3600"/>
    <xsl:variable name="m" select="floor($r div 60)"/>
    <xsl:variable name="s" select="$r mod 60"/>
    <!-- output -->
    <xsl:value-of select="$new-date" />
    <xsl:text>T</xsl:text>
    <xsl:value-of select="format-number($h, '00')"/>
    <xsl:value-of select="format-number($m, ':00')"/>
    <xsl:value-of select="format-number($s, ':00.###')"/>
    <xsl:text>Z</xsl:text>
  </xsl:template>
  
  <xsl:template name="dateTime-to-seconds">
    <xsl:param name="dateTime"/>
    
    <xsl:variable name="date" select="substring-before($dateTime, 'T')" />
    <xsl:variable name="time" select="substring-after($dateTime, 'T')" />
    
    <xsl:variable name="year" select="substring($date, 1, 4)" />
    <xsl:variable name="month" select="substring($date, 6, 2)" />
    <xsl:variable name="day" select="substring($date, 9, 2)" />
    
    <xsl:variable name="hour" select="substring($time, 1, 2)" />
    <xsl:variable name="minute" select="substring($time, 4, 2)" />
    <xsl:variable name="second" select="substring($time, 7, 6)" />
    
    <xsl:variable name="a" select="floor((14 - $month) div 12)"/>
    <xsl:variable name="y" select="$year + 4800 - $a"/>
    <xsl:variable name="m" select="$month + 12*$a - 3"/>    
    <xsl:variable name="jd" select="$day + floor((153*$m + 2) div 5) + 365*$y + floor($y div 4) - floor($y div 100) + floor($y div 400) - 32045" />
    
    <xsl:value-of select="86400*$jd + 3600*$hour + 60*$minute + $second" />
  </xsl:template> 
  
  <xsl:template name="JDN-to-Gregorian">
    <xsl:param name="JDN"/>
    <xsl:variable name="f" select="$JDN + 1401 + floor((floor((4 * $JDN + 274277) div 146097) * 3) div 4) - 38"/>
    <xsl:variable name="e" select="4*$f + 3"/>
    <xsl:variable name="g" select="floor(($e mod 1461) div 4)"/>
    <xsl:variable name="h" select="5*$g + 2"/>
    <xsl:variable name="D" select="floor(($h mod 153) div 5 ) + 1"/>
    <xsl:variable name="M" select="(floor($h div 153) + 2) mod 12 + 1"/>
    <xsl:variable name="Y" select="floor($e div 1461) - 4716 + floor((14 - $M) div 12)"/>
    
    <xsl:value-of select="$Y" />    
    <xsl:value-of select="format-number($M, '-00')"/>
    <xsl:value-of select="format-number($D, '-00')"/>
  </xsl:template>     
  
  
</xsl:stylesheet>
